const express = require('express');
const router = express.Router();

const project = require('../controllers/project.controller');

router.put('/resident/:id', project.changeResidentInCharge);//Checked
router.put('/designer/:id', project.changeDesignerInCharge);//Checked
router.post('/alert/:id', project.addAlertToProject);//Checked
router.get('/info/:id', project.getInformation);//Checked
router.get('/message/:id',project.getMessagesProject);//Checked
router.post('/message/:id',project.addMessageToProject);//Checked
router.put('/activity/:id', project.addActivityToProject);//Checked
router.get('/project/', project.getProjects);//Development Tool
router.post('/project/', project.createProject);//Checked
router.put('/project/:id', project.editProject);//Checked
router.delete('/project/:id', project.deleteProject);//Checked
router.get('/activity/:id', project.getActivitiesProject);//Checked
router.get('/file/:id', project.getFilesProject);//Checked
router.post('/file/:id', project.addFileToProject);//Checked

module.exports = router;