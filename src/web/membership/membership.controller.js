const Membership = require('./membership.model');
// Public Website Data
exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({
      createdAt: -1,
    });

    console.log('Total Records:', memberships.length);

    if (memberships.length > 0) {
      console.log(
        'First Record:',
        JSON.stringify(memberships[0], null, 2)
      );
    }

    if (!memberships.length) {
      return res.status(200).json({
        success: true,
        count: 0,

        pricingSection: {},
        coachingSection: {},
        testimonialSection: {},
        appSection: {},
        teacherSection: {},
        courseCreatorSection: {},

        memberships: [],
        data: [],
      });
    }

    const firstRecord = memberships[0];

 return res.status(200).json({
  success: true,
  count: memberships.length,
  pricingSection: firstRecord.pricingSection || {},
  coachingSection: firstRecord.coachingSection || {},
  testimonialSection: firstRecord.testimonialSection || {},
  appSection: firstRecord.appSection || {},
  finalSections: firstRecord.finalsections || [],

  memberships: memberships.map((item) => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    description: item.description,
    features: item.features,
    isPopular: item.isPopular,
    isActive: item.isActive,
    buttonText: item.buttonText,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  })),
});
  } catch (err) {
    console.log('GET ERROR:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Single Membership
exports.getMembershipById = async (req, res) => {
  try {
    console.log(
      'Membership ID:',
      req.params.id
    );

    const membership =
      await Membership.findById(req.params.id);

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
    console.log('GET BY ID ERROR:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};