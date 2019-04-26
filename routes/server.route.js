const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const account_controller = require('../controllers/server.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', account_controller.test);
// router.get('/:name/cached', account_controller.cached);
router.post('/insert', account_controller.account_insert);
router.get('/:name/byname', account_controller.get_acc_byname);
router.get('/:identity/byidentity', account_controller.get_acc_byidentity);
router.put('/:name/update', account_controller.acc_update);
router.get('/:name/delete', account_controller.acc_delete);

module.exports = router;