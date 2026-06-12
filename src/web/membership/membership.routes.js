const router = require('express').Router();
const membershipCtrl = require('./membership.controller');

// Get all active memberships
router.get('/', membershipCtrl.getAllMemberships);

// Get single membership by ID
router.get('/:id', membershipCtrl.getMembershipById);

module.exports = router;
