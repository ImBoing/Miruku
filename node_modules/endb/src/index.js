'use strict';

const EventEmitter = require('events');
const Util = require('./util');

/**
 * Simple key-value database with cache and multi adapter support.
 * @extends EventEmitter
 */
class Endb extends EventEmitter {
	/**
	 * The options for the Endb instance.
	 * @typedef {Object} EndbOptions
	 * @memberof Endb
	 * @property {string} [uri] The connection URI of the database.
	 * @property {string} [namespace='endb'] The namespace of the database.
	 * @property {string} [adapter] The storage adapter or backend to use.
	 * @property {*} [store=Map]
	 * @property {Function} [serialize=Util.stringify] A data serialization function.
	 * @property {Function} [deserialize=Util.parse] A data deserialization function.
	 * @property {string} [collection='endb'] The name of the collection. Only works for MongoDB.
	 * @property {string} [table='endb'] The name of the table. Only works for SQL databases.
	 * @property {number} [keySize=255] The maximum size of the keys of elements.
	 */

	/**
	 * @param {string|EndbOptions} [options={}] The options for the Endb.
	 */
	constructor(options = {}) {
		super();
		this.options = Object.assign(
			{
				namespace: 'endb',
				serialize: Util.stringify,
				deserialize: Util.parse
			},
			typeof options === 'string' ? {uri: options} : options
		);
		Util.validateOptions(this.options);

		if (!this.options.store) {
			this.options.store = Util.load(Object.assign({}, this.options));
		}

		if (typeof this.options.store.on === 'function') {
			this.options.store.on('error', error => this.emit('error', error));
		}
	}

	/**
	 * Gets all the elements from the database.
	 * @return {Promise<any[]|undefined>} All the elements in the database.
	 */
	all() {
		return Promise.resolve()
			.then(() => {
				if (this.options.store instanceof Map) {
					const data = [];
					for (const [key, value] of this.options.store) {
						data.push({
							key: Util.removeKeyPrefix(key, this.options.namespace),
							value: this.options.deserialize(value)
						});
					}

					return data;
				}

				return this.options.store.all();
			})
			.then(data => (data === undefined ? undefined : data));
	}

	/**
	 * Clears all elements from the database.
	 * @return {Promise<undefined>} Returns `undefined`
	 */
	clear() {
		return Promise.resolve().then(() => this.options.store.clear());
	}

	/**
	 * Deletes an element from the database by key.
	 * @param {string|string[]} key The key(s) of the element to remove from the database.
	 * @return {Promise<boolean|boolean[]>} `true` if the element(s) is deleted successfully, otherwise `false`.
	 * @example
	 * await Endb.set('foo', 'bar'); // true
	 *
	 * await Endb.delete('foo'); // true
	 * await Endb.delete(['foo', 'fizz']); // [ true, false ]
	 */
	delete(key) {
		if (typeof key !== 'string') {
			throw new TypeError('Key must be a string');
		}

		key = Util.addKeyPrefix(key, this.options.namespace);
		return Promise.resolve().then(() => {
			if (Array.isArray(key)) {
				return Promise.all(key.map(k => this.options.store.delete(k)));
			}

			return this.options.store.delete(key);
		});
	}

	/**
	 * Ensures if an element exists in the database. If the element does not exist, sets the element to the database and returns the value.
	 * @param {string} key The key of the element to ensure.
	 * @param {*} value The value of the element to ensure.
	 * @return {Promise<any|undefined>} The (default) value of the element.
	 * @example
	 * await Endb.set('en', 'db');
	 *
	 * const data = await Endb.ensure('foo', 'bar');
	 * console.log(data); // 'bar'
	 *
	 * const data = await Endb.ensure('en', 'db');
	 * console.log(data); // 'db'
	 */
	async ensure(key, value = null) {
		if (value === null) {
			throw new TypeError('Value must be provided.');
		}

		const exists = await this.has(key);
		if (!exists) {
			await this.set(key, value);
			return value;
		}

		const data = await this.get(key);
		return data;
	}

	/**
	 * Finds a single item where the given function returns a truthy value.
	 * Behaves like {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find Array.prototype.find}.
	 * The database elements is mapped by their `key`. If you want to find an element by key, you should use the `get` method instead.
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get MDN} for more details.
	 * @param {Function} fn The function to execute on each value in the element.
	 * @param {*} [thisArg] Object to use as `this` inside callback.
	 * @return {Promise<*|undefined>} The first element in the database that satisfies the provided testing function. Otherwise `undefined` is returned
	 * @example
	 * await Endb.set('foo', 'bar');
	 * await Endb.set('profile', {
	 *   id: 1234567890,
	 *   username: 'user',
	 *   verified: true,
	 *   nil: null,
	 *   hobbies: ['programming']
	 * });
	 *
	 * await Endb.find(v => v === 'bar'); // { key: 'foo', value: 'bar' }
	 * await Endb.find(v => v.verified === true); // { key: 'profile', value: { ... } }
	 * await Endb.find(v => v.desc === 'desc'); // undefined
	 */
	async find(fn, thisArg) {
		if (typeof thisArg !== 'undefined') {
			fn = fn.bind(thisArg);
		}

		const data = await this.all();
		for (const {key, value} of data) {
			if (fn(value, key)) {
				return value;
			}
		}

		return undefined;
	}

	/**
	 * Gets the value of an element from the database by key.
	 * @param {string} key The key of the element to get.
	 * @param {string} [path=null] The path of the property to get from the value.
	 * @return {Promise<*|undefined>} The value of the element, or `undefined` if the element cannot be found in the database.
	 * @example
	 * const data = await Endb.get('foo');
	 * console.log(data); // 'bar'
	 *
	 * // Using path feature
	 * await Endb.get('profile', 'verified'); // false
	 */
	get(key, path = null) {
		if (typeof key !== 'string') {
			throw new TypeError('Endb#get: key must be a string.');
		}

		key = Util.addKeyPrefix(key, this.options.namespace);
		return Promise.resolve()
			.then(() => this.options.store.get(key))
			.then(data =>
				typeof data === 'string' ? this.options.deserialize(data) : data
			)
			.then(data => (path === null ? data : Util.get(data, path)))
			.then(data => (data === undefined ? undefined : data));
	}

	/**
	 * Checks whether an element exists in the database or not.
	 * @param {string} key The key of an element to check for.
	 * @return {Promise<boolean>} `true` if the element exists in the database, otherwise `false`.
	 */
	async has(key) {
		if (typeof key !== 'string') {
			throw new TypeError('Key must be a string');
		}

		if (this.options.store instanceof Map) {
			const result = await this.options.store.has(
				Util.addKeyPrefix(key, this.options.namespace)
			);
			return result;
		}

		return Boolean(await this.get(key));
	}

	/**
	 * Returns an array that contains the keys of each element.
	 * @return {Promise<string[]>} An array that contains the keys of each element.
	 */
	async keys() {
		const data = await this.all();
		return data.map(element => element.key);
	}

	/**
	 * Performs a mathematical operation on a value of an element.
	 * @param {string} key The key of the element.
	 * @param {string} operation The mathematical operation to perform.
	 * @param {number} operand The right-hand operand.
	 * @param {string} [path=null] The path of the property to perform mathematical operation on.
	 * @return {true} Returns `true`.
	 * @example
	 * balance.set('endb', 100);
	 *
	 * balance.math('endb', 'add', 100); // true
	 */
	async math(key, operation, operand, path = null) {
		const data = await this.get(key);
		if (path !== null) {
			const propValue = Util.get(data, path);
			if (typeof propValue !== 'number')
				throw new TypeError('The first operand must be a number.');
			const result = await this.set(
				key,
				Util.math(propValue, operation, operand),
				path
			);
			return result;
		}

		if (typeof data !== 'number')
			throw new TypeError('The first operand must be a number.');
		const result = await this.set(key, Util.math(data, operation, operand));
		return result;
	}

	/**
	 * Creates multiple instances of Endb.
	 * @param {string[]} names An array of strings. Each element will create new instance.
	 * @param {EndbOptions} [options=EndbOptions] The options for the instances.
	 * @return {Object} An object containing created Endb instances.
	 * @example
	 * const endb = Endb.multi(['users', 'members']);
	 * const endb = Endb.multi(['users', 'members'], {
	 *     uri: 'sqlite://endb.sqlite',
	 *     namespace: 'mydb'
	 * });
	 *
	 * await enbb.users.set('foo', 'bar');
	 * await endb.members.set('bar', 'foo');
	 */
	static multi(names, options = {}) {
		if (!Array.isArray(names) || names.length === 0) {
			throw new TypeError('Names must be an array of strings.');
		}

		const instances = {};
		for (const name of names) {
			instances[name] = new Endb(options);
		}

		return instances;
	}

	/**
	 * Pushes an item to the array value in the database.
	 * @param {string} key The key of the element to push to.
	 * @param {*} value The value to push.
	 * @param {string} [path=null]
	 * @param {boolean} [allowDuplicates=false] Whether or not, allow duplicates elements in the value.
	 * @return {Promise<*>} The value to push.
	 */
	async push(key, value, path = null, allowDuplicates = false) {
		const data = await this.get(key);
		if (path !== null) {
			const propValue = Util.get(data, path);
			if (!Array.isArray(propValue))
				throw new TypeError('Target must be an array.');
			if (!allowDuplicates && propValue.includes(value)) return value;
			propValue.push(value);
			Util.set(data, path, propValue);
		} else {
			if (!Array.isArray(data)) throw new TypeError('Target must be an array.');
			if (!allowDuplicates && data.includes(value)) return value;
			data.push(value);
		}

		await this.set(key, data);
		return value;
	}

	/**
	 * Removes an item from the array value of an element in the database.
	 * Note that structured or complex data types such as arrays or objects cannot be removed from the value of the element.
	 * @param {string} key The key of the element to remove.
	 * @param {*} value The value to remove. Must be a string.
	 * @param {string} [path=null] The path of the property to remove.
	 * @return {Promise<*>} The value to remove.
	 */
	async remove(key, value, path = null) {
		const data = await this.get(key);
		if (path !== null) {
			const propValue = Util.get(data, path);
			if (!Array.isArray(propValue)) {
				throw new TypeError('Target must be an array.');
			}

			propValue.splice(propValue.indexOf(value), 1);
			Util.set(data, path, propValue);
		} else if (Array.isArray(data)) {
			if (data.includes(value)) {
				data.splice(data.indexOf(value), 1);
			}
		} else if (data !== null && typeof data === 'object') {
			delete data[value];
		}

		await this.set(key, data);
		return value;
	}

	/**
	 * Sets an element to the database.
	 * @param {string} key The key of the element to set to the database.
	 * @param {*} value The value of the element to set to the database.
	 * @param {string} [path=null] The path of the property to set in the value.
	 * @return {Promise<true>} Returns `true`.
	 * @example
	 * await Endb.set('foo', 'bar');
	 * await Endb.set('total', 400);
	 * await Endb.set('exists', false);
	 * await Endb.set('profile', {
	 *   id: 1234567890,
	 *   username: 'user',
	 *   verified: true,
	 *   nil: null
	 * });
	 * await Endb.set('todo', [ 'Add a authentication system.', 'Refactor the generator' ]);
	 *
	 * await endb.set('profile', false, 'verified');
	 * await endb.set('profile', 100, 'balance');
	 */
	set(key, value, path = null) {
		if (typeof key !== 'string') {
			throw new TypeError('Key must be a string.');
		}

		key = Util.addKeyPrefix(key, this.options.namespace);
		if (path !== null) {
			const data = this.options.store.get(key);
			value = Util.set(
				typeof data === 'string' ? this.options.deserialize(data) : data || {},
				path,
				value
			);
		}

		return Promise.resolve()
			.then(() => this.options.serialize(value))
			.then(value => this.options.store.set(key, value))
			.then(() => true);
	}

	/**
	 * Returns an array that contains the values of each element.
	 * @return {Promise<any[]>} Array that contains the values of each element.
	 */
	async values() {
		const data = await this.all();
		return data.map(element => element.value);
	}
}

module.exports = Endb;
module.exports.Endb = Endb;
module.exports.Util = require('./util');
