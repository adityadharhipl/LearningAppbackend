const LandingPage = require('./landing.model');

exports.getLandingPage = async (req, res) => {
  try {
    const landing = await LandingPage.findOne();
    return res.status(200).json({
      success: true,
      data: landing
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
