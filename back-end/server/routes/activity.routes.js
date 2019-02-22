const express = require('express');
const router = express.Router();

const activity = require('../controllers/activity.controller');

router.get('/activity/:id', activity.getActivity);//Checked
router.delete('/activity/:id', activity.deleteActivity);//Checked
router.put('/start/:id', activity.startActivity);//Checked
router.put('/verifyDeliverables/:id', activity.verifyDeliverables);//Checked
router.put('/verifyObjectives/:id', activity.verifyObjectives);//Checked
router.put('/finish/:id', activity.finishActivity);//Checked
router.post('/comment/:id', activity.addComment);//Checked
router.put('/activity/:id', activity.editActivity);//Checked

module.exports = router;