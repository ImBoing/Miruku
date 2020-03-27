<div align="center">
    <a href="https://endb.js.org"><img src="docs/media/logo.png" width="300" height="300" alt="Endb" /></a>
</div>

> 🗃 Simple key-value storage with support for multiple backends.

![Test](https://github.com/chroventer/endb/workflows/Test/badge.svg)
[![Dependencies](https://img.shields.io/david/chroventer/endb.svg?maxAge=3600)](https://david-dm.org/chroventer/endb)
[![Downloads](https://badgen.net/npm/dt/endb)](https://www.npmjs.com/package/endb)
[![GitHub Stars](https://badgen.net/github/stars/chroventer/endb)](https://github.com/chroventer/endb)
[![License](https://badgen.net/github/license/chroventer/endb)](https://github.com/chroventer/endb/blob/master/LICENSE)

## Features

- [**Easy-to-use**](#usage): *Endb* has a simplistic and convenient promise-based API.
- [**Adapters**](#usage): By default, data is cached in memory. Optionally, install and utilize a "storage adapter".
- [**Third-Party Adapters**](#third-party-adapters): You can optionally utilize third-party storage adapters or build your own.
- [**Namespaces**](#namespaces): Namespaces isolate elements within the database to enable useful functionalities.
- [**Custom Serializers**](#custom-serializers): Utilizes its own data serialization methods to ensure consistency across various storage backends.
- [**Embeddable**](#embeddable): Designed to be easily embeddable inside modules.
- **Data Types**: Handles all the JSON types including [`Buffer`](https://nodejs.org/api/buffer.html).
- **Error-Handling**: Connection errors are transmitted through, from the adapter to the main instance; consequently, connection errors do not exit or kill the process.

## Installation

```bash
$ npm install endb
```

By default, data is cached in memory. Optionally, install and utilize a "storage adapter". Officially supported adapters are LevelDB, MongoDB, NeDB, MySQL, PostgreSQL, Redis, and SQLite.

```bash
$ npm install level # LevelDB
$ npm install mongojs # MongoDB
$ npm install nedb # NeDB
$ npm install ioredis # Redis

# To use SQL database, an additional package 'sql' must be installed and an adapter
$ npm install sql

$ npm install mysql2 # MySQL
$ npm install pg # PostgreSQL
$ npm install sqlite3 # SQLite
```

## Usage

```javascript
// Import/require the package.
const Endb = require('endb');

const endb = new Endb();
const endb = new Endb({
    // One of the following
    uri: 'leveldb://path/to/database',
    uri: 'mongodb://user:pass@localhost:27017/dbname',
    uri: 'mysql://user:pass@localhost:3306/dbname',
    uri: 'postgresql://user:pass@localhost:5432/dbname',
    uri: 'redis://user:pass@localhost:6379',
    uri: 'sqlite://path/to/database.sqlite'
});

// Handles connection errors
endb.on('error', error => console.error('Connection Error: ', error));

await endb.set('foo', 'bar'); // true
await endb.get('foo'); // 'bar'
await endb.has('foo'); // true
await endb.all(); // [ { key: 'foo', value: 'bar' } ]
await endb.delete('foo'); // true
await endb.clear(); // undefined
```

## Namespaces

Namespaces isolate elements within the database to avoid key collisions, separate elements by prefixing the keys, and allow clearance of only one namespace while utilizing the same database.

```javascript
const users = new Endb({ namespace: 'users' });
const members = new Endb({ namespace: 'members' });

await users.set('foo', 'users'); // true
await members.set('foo', 'members'); // true
await users.get('foo'); // 'users'
await members.get('foo'); // 'members'
await users.clear(); // undefined
await users.get('foo'); // undefined
await members.get('foo'); // 'members'
```

## Third-Party Adapters

You can optionally utilize third-party storage adapters or build your own. *Endb* will integrate the third-party storage adapter and handle complex data types internally.

```javascript
const myAdapter = require('./my-adapter');
const endb = new Endb({ store: myAdapter });
```

For example, [`quick-lru`](https://github.com/sindresorhus/quick-lru) is an unrelated and independent module that has an API similar to that of *Endb*.

```javascript
const QuickLRU = require('quick-lru');

const lru = new QuickLRU({ maxSize: 1000 });
const endb = new Endb({ store: lru });
```

## Custom Serializers

*Endb* handles all the JSON data types including Buffer using its data serialization methods that encode Buffer data as a base64-encoded string, and decode JSON objects which contain buffer-like data, either as arrays of strings or numbers, into Buffer instances to ensure consistency across various backends.

Optionally, pass your own data serialization methods to support extra data types.

```javascript
const endb = new Endb({
    serialize: JSON.stringify,
    deserialize: JSON.parse
});
```

**Warning**: Using custom serializers means you lose any guarantee of data consistency.

## Embeddable

*Endb* is designed to be easily embeddable inside modules. It is recommended to set a [namespace](#namespaces) for the module.

```javascript
class MyModule {
    constructor(options) {
        this.db = new Endb({
            uri: typeof opts.store === 'string' && opts.store,
			store: typeof opts.store !== 'string' && opts.store
            namespace: 'mymodule'
        });
    }
}

// Caches data in the memory by default.
const myModule = new MyModule();

// After installing ioredis.
const myModule = new MyModule({ store: 'redis://localhost' });
const myModule = new AwesomeModule({ store: thirdPartyAdapter });
```

## Links

- [Documentation](https://endb.js.org "Documentation")
- [GitHub](https://github.com/chroventer/endb "GitHub")
- [NPM](https://npmjs.com/package/endb "NPM")
