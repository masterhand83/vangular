const Alert = require('../models/alert');
const User = require('../models/user');
const alertCtrl = {};

var moment = require('moment');
moment().format();

alertCtrl.addAlert = async (id, data, userId) => {
    var date = moment();
    const obj = {
        link: data.link,
        description: data.description,
        date: date
    };
    const alert = new Alert(obj);
    await alert.save();
    await User.updateOne( { '_id': userId, 'alerts.projectId': id }, { $addToSet: {'alerts.$.alert': alert._id } } );
};//External Checked

alertCtrl.newProjectAlert = async (idUser, id) => {
    var date = moment();
    const alert = {
        link: 'link',
        description: '¡Urgente! Proyectista, favor de completar la información general',
        date: date
    };
    const newAlert = new Alert(alert);
    await newAlert.save();
    await User.findByIdAndUpdate( idUser, { $addToSet: { alerts: { projectId: id, alert: [ newAlert._id ] } } } );
};//External Checked

alertCtrl.deleteUserAlerts = async (idProject, idUser) => {
    const user = await User.findById(idUser);
    var alerts = Array.from(user.alerts);
    if (alerts.length !== 0) {
        let obj = await alerts.find( item => {
            return item.projectId == idProject;
        });
        for (var alert of obj.alert) {
            await Alert.findByIdAndDelete(alert);
        }
        await User.findByIdAndUpdate( idUser, { $pull: { alerts: { projectId: idProject } } } );
    }
};//External Checked

alertCtrl.deleteAlerts = async (id) => {
    const users = await User.find( { 'alerts.projectId': id }, { alerts: 1 } ).lean();
    for (var array of users) {
        var alerts = Array.from(array.alerts);
        let obj = await alerts.find( item => {
            return item.projectId == id;
        });
        for (var alert of obj.alert) {
            await Alert.findByIdAndDelete(alert);
        }
        await User.updateMany( { 'alerts.projectId': id }, { $pull: { alerts: { projectId: id } } } );
    }
};//External Checked

module.exports = alertCtrl;