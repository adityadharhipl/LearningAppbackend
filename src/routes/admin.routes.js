const router = require('express').Router();

const adminAuthRoutes = require('../admin/auth/auth.routes');
router.use('/auth', adminAuthRoutes);

const adminLandingRoutes = require('../admin/landing/landing.routes');
router.use('/landing', adminLandingRoutes);

const adminProfileRoutes = require('../admin/profile/profile.routes');
router.use('/profile', adminProfileRoutes);

const adminBlogRoutes = require('../admin/blog/blog.routes');
router.use('/blogs', adminBlogRoutes);

const adminMembershipRoutes = require('../admin/membership/membership.routes');
router.use('/memberships', adminMembershipRoutes);

module.exports = router;
