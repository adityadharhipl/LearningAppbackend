const LandingPage = require('./landing.model');

/**
 * @desc   Create a new Landing Page
 * @route  POST /api/v1/admin/landing
 * @access Admin
 */
exports.createLanding = async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(401).json({ success: false, message: 'Invalid request body' });
  }
  try {
    const landing = await LandingPage.create(req.body);
    return res.status(201).json({ success: true, data: landing });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc   Get the Landing Page
 * @route  GET /api/v1/admin/landing
 * @access Admin
 */
exports.getLanding = async (req, res) => {
  try {
    const landing = await LandingPage.findOne();
    return res.json({ success: true, data: landing });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc   Update a Landing Page by ID
 * @route  PUT /api/v1/admin/landing/:id
 * @access Admin
 */
exports.updateLanding = async (req, res) => {
  try {
    const landing = await LandingPage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: landing });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH endpoint for partial updates
exports.patchLanding = async (req, res) => {
  try {
    const landing = await LandingPage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: landing });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc   Delete a Landing Page by ID
 * @route  DELETE /api/v1/admin/landing/:id
 * @access Admin
 */
exports.deleteLanding = async (req, res) => {
  try {
    await LandingPage.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
