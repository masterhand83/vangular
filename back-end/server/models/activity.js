const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    priority: { type: Number, required: true },
    objective: [{ type: String, default:[], required: true }],
    objectivesVerified: { type: Boolean, default: false, required: true },
    deliverable: [{ type: String, default:[], required: true }],
    deliverablesVerified: { type: Boolean, default: false, required: true },
    started: { type: Boolean, default: false, required: true },
    finished: { type: Boolean, default: false, required: true },
    color: { type: String, default: '#000000', required: true },
    comments: [{
        authorName: { type: String, required: true },
        comment: { type: String, required: true },
        date: { type: Date, required: true }
    }]
});

module.exports = mongoose.model('Activity', ActivitySchema);