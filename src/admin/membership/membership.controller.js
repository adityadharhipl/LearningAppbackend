const Membership = require('./membership.model');

// Get all membership plans (admin)
exports.getAllMembershipsAdmin = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get single membership
exports.getMembershipAdminById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership plan not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: membership,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create membership
exports.createMembership = async (req, res) => {
  try {
     console.log("BODY:", req.body)
    const membership = await Membership.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Membership plan created successfully',
      data: membership,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// Update membership
exports.updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership plan not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Membership plan updated successfully',
      data: membership,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete membership
exports.deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(
      req.params.id
    );

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership plan not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Membership plan deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};