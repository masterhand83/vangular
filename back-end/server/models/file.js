const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
    filename: { type: String, unique: true },
    author: { type: String },
    path: { type: String },
    originalname: { type: String },
    icon: { type: String },
    size: { type: String },
    created_at: { type: Date }
});

module.exports = mongoose.model('File', FileSchema);