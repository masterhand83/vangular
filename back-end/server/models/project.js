const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    storeName: { type: String, required: false },
    storeNumber: { type: Number, required: false },
    m2: { type: Number, required: false },
    location: { type: String, required: false },
    localReception: { type: Date, required: false },
    openingDate: { type: Date, required: false },
    furnitureDate: { type: Date, required: false },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity", default: [], required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: [], required: true }],
    files: [{ type: Schema.Types.ObjectId, ref: "File", default: [], required: true }]
});

module.exports = mongoose.model('Project', ProjectSchema);