const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/user', user.getUsers);//Development Tool <---|
router.post('/user', user.createUser);//Checked           | Change name
router.get('/users', user.viewUsers);//Checked -----------|
router.get('/user/:id', user.getUser);//Checked
router.get('/project/:id', user.getUserProjects);//Checked
router.put('/user/:id', user.editUser);//Checked
router.delete('/user/:id', user.deleteUser);
router.post('/login', user.login);//Checked
router.get('/alert/:id', user.getAlerts);//Checked
router.delete('/alert/:id', user.deleteAlert);//Checked
router.get('/residents', user.getResidents);//Checked
router.get('/designers', user.getDesigners);//Checked

module.exports = router;