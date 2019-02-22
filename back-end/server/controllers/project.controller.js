const Project = require('../models/project');
const User = require('../models/user');
const activityCtrl = require('../controllers/activity.controller');
const userCtrl = require('../controllers/user.controller');
const messageCtrl = require('../controllers/message.controller');
const alertCtrl = require('../controllers/alert.controller');
const fileCtrl = require('../controllers/file.controller');
const projectCtrl = {};

var moment = require('moment');
moment().format();

projectCtrl.getProjects = async (req, res) => {
    const projects = await Project.find().lean();
    for (var item of projects) {
        const { name } = await User.findOne({projects: item._id, userType: 2}).lean();
        item.resident = name;
    }
    res.json(projects);
};//Development Tool

projectCtrl.getInformation = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id, { activities: 0 , messages: 0, files: 0 });
    res.json(project);
};//Checked

projectCtrl.createProject = async (req,res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description
    });
    const { idUser1 } = req.body;
    const { idUser2 } = req.body;
    const { idUser3 } = req.body;
    var users = new Array(idUser1,idUser2,idUser3);
    await project.save()
        .then(function () {
            activityCtrl.createActivitiesForNewProject(project._id);
            for (var item of users) {
                userCtrl.addProjectToUser(item,project._id);
                alertCtrl.newProjectAlert(item, project._id);
            }
            res.json({
                status: 'Project '+project.name+' saved'
            });
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                status: 'Project '+project.name+' failed'
            });
        });
};//Checked

projectCtrl.changeResidentInCharge = async (req, res) => {
    const { id } = req.params;
    const { idNewResident } = req.body;
    await User.findOneAndUpdate({projects: id, userType: 2},{$pull: {projects: id}})
        .then(function () {
            userCtrl.addProjectToUser(idNewResident,id);
            alertCtrl.deleteUserAlerts(id, idNewResident);
            res.json({
                status: 'Resident changed'
            });
        })
        .catch(function () {
            res.json({
                status: 'Change Failed'
            });
        });
};//Checked

projectCtrl.changeDesignerInCharge = async (req, res) => {
    const { id } = req.params;
    const { idNewDesigner } = req.body;
    await User.findOneAndUpdate({projects: id, userType: 3},{$pull: {projects: id}})
        .then(function () {
            userCtrl.addProjectToUser(idNewDesigner,id);
            alertCtrl.deleteUserAlerts(id, idNewDesigner);
            res.json({
                status: 'Designer changed'
            });
        })
        .catch(function () {
            res.json({
                status: 'Change Failed'
            });
        });
};//Checked

projectCtrl.getFilesProject = async (req, res) => {
    const { id } = req.params;
    const { files } = await Project.findById(id).populate('files', 'author originalname icon size created_at');
    res.json(files);
};//Checked

projectCtrl.addFileToProject = async (req, res) => {
    const { id } = req.params;
    await Project.findById(id)
        .then((project) => {
            if(project === null){
                res.json({
                    status: 'Fail to Add File 1'
                });
            }
            else{
                fileCtrl.uploadFile(req, async (cb) => {
                    await Project.findByIdAndUpdate(id, {$addToSet: {files: cb}})
                });
                res.json({
                    status: 'File Added to Project'
                });
            }
        })
        .catch(() => {
            res.json({
                status: 'Fail to Add File 2'
            });
        });
};//Checked

projectCtrl.addActivityToProject = async (req, res) => {
    const { id } = req.params;
    await Project.findById(id)
    .then((project) => {
        if(project === null){
            res.json({
                status: 'Fail to Add Activity 1'
            });
        }
        else{
            activityCtrl.createActivity(req.body, async (cb) => {
                await Project.findByIdAndUpdate(id, {$addToSet: {activities: cb}});
            });
            res.json({
                status: 'Activity Added to Project'
            });
        }
    })
    .catch(() => {
        res.json({
            status: 'Fail to Add Activity 2'
        });
    });
};//Checked

projectCtrl.getActivitiesProject = async (req, res) => {
    const { id } = req.params;
    const { activities } = await Project.findById(id,{activities: -1, _id: 0}).populate({ path: 'activities', options: { sort: { start: 1, end: 1 } } }).exec();
    var GanttData = new Array();
    var num = 0;
    activities.forEach(element => {
        num++;
        var activity = { id: element._id, index: num, name: element.name, start: new Date(element.start), end: new Date(element.end), color: element.color};
        GanttData.push(activity);
    });
    res.json(GanttData);
};//Checked

projectCtrl.editProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    var localReception = moment(req.body.localReception);
    var openingDate = moment(req.body.openingDate);
    var furnitureDate = moment(req.body.furnitureDate);
    project.storeName = req.body.storeName;
    project.storeNumber = req.body.storeNumber;
    project.m2 = req.body.m2;
    project.location = req.body.location;
    project.localReception = localReception;
    project.openingDate = openingDate;
    project.furnitureDate = furnitureDate;
    await Project.findByIdAndUpdate(id, {$set: project}, {new: true});
    res.json({
        status: 'Project '+project.name+' Updated'
    });
};//Checked

projectCtrl.addMessageToProject = async (req,res) => {
    const { id } = req.params;
    messageCtrl.addMessage(req.body, async(cb) => {
        await  Project.findByIdAndUpdate(id, {$addToSet: {messages: cb}});
    });
    res.json({
        status: 'Message Added to Project'
    });
};//Checked

projectCtrl.getMessagesProject = async (req, res) => {
    const { id } = req.params;
    const { messages } = await Project.findById(id).populate('messages').lean();
    var newMessages = new Array();
    for(const item of messages){
        var date = moment(item.date).locale('es').format('LLLL');
        item.date = date;
        newMessages.push(item);
    }
    res.json(newMessages);
};//Checked

projectCtrl.addAlertToProject = async (req,res) => {
    const { id } = req.params;
    const data = req.body;
    const user = await User.find({projects: id}, {projects: 1});
    for (var item of user) {
        alertCtrl.addAlert(id, data, item._id);
    }
    res.json({
        status: 'Alert Added to Project'
    });
};//Checked

projectCtrl.deleteProject = async (req, res) => {
    const { id } = req.params
    const project = await Project.findById(id);
    for (var item of project.activities) {
        activityCtrl.deleteActivities(item);
    }
    for (var item of project.messages) {
        messageCtrl.deleteMessages(item);
    }
    for (var item of project.files) {
        fileCtrl.deleteFiles(item);
    }
    userCtrl.removeIdProject(id);
    alertCtrl.deleteAlerts(id);
    await Project.findByIdAndRemove(id);
    res.json({
        status: 'Project '+project.name+' Deleted'
    });
};//Checked

module.exports = projectCtrl;