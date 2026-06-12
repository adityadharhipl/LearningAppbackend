const Membership = require('./membership.model');

// Get all active membership plans (public)
exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find({ isActive: true }).sort({ 'price.monthly': 1 });
    return res.json({ success: true, count: memberships.length, data: memberships });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single membership plan by ID (public)
exports.getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    return res.json({ success: true, data: membership });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
