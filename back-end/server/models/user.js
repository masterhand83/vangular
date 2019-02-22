const mongoose = require('mongoose');
const { Schema } = mongoose;
var Alert = require('../models/alert');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    userType: { type: Number, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project", required: false, default: [] }],
    alerts: [{
        projectId:{ type: Schema.Types.ObjectId, ref: "Project", required: true },
        alert:[{ type: Schema.Types.ObjectId, ref: "Alert", default: [], required: true }]
    }]
});

module.exports = mongoose.model('User', UserSchema);