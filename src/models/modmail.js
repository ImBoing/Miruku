const mongoose = require("mongoose");

const modmailSchema = mongoose.Schema({
    username: String,
    threadCount: Number
});

module.exports = mongoose.model('threads', modmailSchema)