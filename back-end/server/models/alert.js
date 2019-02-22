const mongoose = require('mongoose');
const { Schema } = mongoose;
const Project = require('../models/project');

const AlertSchema = new Schema({
    link: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Alert', AlertSchema);