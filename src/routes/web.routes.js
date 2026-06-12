const router = require('express').Router();

const webAuthRoutes = require('../web/auth/auth.routes');
router.use('/auth', webAuthRoutes);

const webLandingRoutes = require('../web/landing/landing.routes');
router.use('/landing', webLandingRoutes);

const webBlogRoutes = require('../web/blog/blog.routes');
router.use('/blogs', webBlogRoutes);

const webMembershipRoutes = require('../web/membership/membership.routes');
router.use('/memberships', webMembershipRoutes);

module.exports = router;
