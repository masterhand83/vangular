const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    authorName: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);