const User = require('../models/user');
const Project = require('../models/project');
const Alert = require('../models/alert');
const userCtrl = {};

const CryptoJS = require("crypto-js");

userCtrl.getUsers = async (req, res) => {
    const user = await User.find().populate('projects').exec();
    res.json(user);
};//Development Tool

userCtrl.getResidents = async (req, res) => {
    const user = await User.find({userType: 2}, {name: 1});
    var newUsers = new Array();
    for(const item of user){
        var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(item), 'secret key 117');
        var cryptedText = cryptedData.toString();
        newUsers.push(cryptedText);
    }
    res.json(newUsers);
};//Checked

userCtrl.getDesigners = async (req, res) => {
    const user = await User.find({userType: 3}, {name: 1});
    var newUsers = new Array();
    for(const item of user){
        var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(item), 'secret key 117');
        var cryptedText = cryptedData.toString();
        newUsers.push(cryptedText);
    }
    res.json(newUsers);
};//Checked

userCtrl.removeIdProject = async (id) => {
    const user = await User.find({projects: id}, {projects: 1});
    for (var item of user) {
        await User.findByIdAndUpdate(item._id,{$pull: {projects: id}});
    }
};//External Checked

userCtrl.createUser = async (req,res) => {
    const { userData } = req.body;
    var bytes = CryptoJS.AES.decrypt(userData, 'secret key 117');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const user = new User(decryptedData);
    await user.save()
        .then(function () {
            res.json({
                status: 'User '+user.name+' saved'
            });
        })
        .catch(function () {
            res.json({
                status: 'Failed to save user'
            });
        });
};//Checked

userCtrl.getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id, { alerts: 0}).populate("projects", "name").exec();
    var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret key 117');
    var cryptedText = cryptedData.toString();
    res.json({
        data: cryptedText
    });
};//Checked

userCtrl.viewUsers = async (req, res) => {
    const user = await User.find({ userType: { $nin: [ 0, 1 ] } }, {name: 1});
    var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret key 117');
    var cryptedText = cryptedData.toString();
    res.json({
        data: cryptedText
    });
};//Checked

userCtrl.getUserProjects = async (req, res) => {
    const { id } = req.params;
    const { projects } = await User.findById(id).populate("projects", "name").lean().exec();
    for (var item of projects) {
        const { name } = await User.findOne({projects: item._id, userType: 2}).lean();
        item.resident = name;
        const { activities } = await Project.findById(item._id).populate("activities", "finished");
        var activitiesArray = Array.from(activities);
        let finisheds = await activitiesArray.filter( item => {
            return item.finished == true;
        });
        let progress = finisheds.length*100/activities.length;
        item.progress = progress;
    }
    res.json(projects);
};//Checked

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const { userData } = req.body;
    var bytes = CryptoJS.AES.decrypt(userData.toString(), 'secret key 117');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    user.name = decryptedData.name;
    user.email = decryptedData.email;
    user.password = decryptedData.password;
    user.mobile = decryptedData.mobile;
    await User.findByIdAndUpdate(id, {$set: user}, {new: true})
        .then(function () {
            res.json({
                status: 'User '+user.name+' Updated'
            });
        })
        .catch(function () {
            res.json({
                status: 'Failed to update user'
            });
        });
};//Checked

userCtrl.addProjectToUser = async (idUser, idProject) => {
    await User.findByIdAndUpdate(idUser, {$addToSet: {projects: idProject}});
};//External Checked

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    await User.findByIdAndRemove(id)
        .then(function () {
            res.json({
                status: 'User '+user.name+' Deleted'
            });
        })
        .catch(function () {
            res.json({
                status: 'Failed to Delete User'
            });
        });
};

userCtrl.getAlerts = async (req, res) => {
    const { id } = req.params;
    const { alerts } = await User.findById(id).populate('alerts.alert').populate('alerts.projectId', 'name');
    res.json(alerts);
};//Checked

userCtrl.deleteAlert = async (req, res) => {
    const { id } = req.params;
    await User.updateOne( { 'alerts.alert': id }, { $pull: {'alerts.$.alert': id } } );
    await Alert.findByIdAndDelete(id);
    res.json({
        status: 'Alert Deleted'
    });
};//Checked

userCtrl.login = async (req, res) => {
    const { userData } = req.body;
    var bytes = CryptoJS.AES.decrypt(userData.toString(), 'secret key 117');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const { email } = decryptedData;
    const { password } = decryptedData;
    const user = await User.find({ email: email, password: password }, { userType: 1 });
    var cryptedUser = new Array();
    for(const item of user){
        var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(item), 'secret key 117');
        var cryptedText = cryptedData.toString();
        cryptedUser.push(cryptedText);
    }
    res.json(cryptedUser);
};//Checked

module.exports = userCtrl;