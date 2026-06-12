const router = require('express').Router();
const membershipCtrl = require('./membership.controller');
const adminAuth = require('../../middleware/auth.middleware');
const { createMembershipValidation, updateMembershipValidation } = require('./membership.validation');
const { checkValidation } = require('../../middleware/validation.middleware');

// Admin membership routes
router.get('/', adminAuth, membershipCtrl.getAllMembershipsAdmin);
router.post('/add', adminAuth, createMembershipValidation, checkValidation, membershipCtrl.createMembership);
router.put('/edit/:id', adminAuth, updateMembershipValidation, checkValidation, membershipCtrl.updateMembership);
router.delete('/delete/:id', adminAuth, membershipCtrl.deleteMembership);

module.exports = router;
