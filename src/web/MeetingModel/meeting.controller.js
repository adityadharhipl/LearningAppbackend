const {
  RtcTokenBuilder,
  RtcRole
} = require("agora-access-token");

exports.generateToken = async (req, res) => {
  try {
    const { channelName, uid } = req.body;

    const appId = process.env.AGORA_APP_ID;
    const appCertificate =
      process.env.AGORA_APP_CERTIFICATE;

    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(
      Date.now() / 1000
    );

    const privilegeExpireTime =
      currentTimestamp +
      expirationTimeInSeconds;

    const token =
      RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        role,
        privilegeExpireTime
      );

    return res.status(200).json({
      success: true,
      appId,
      channelName,
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};