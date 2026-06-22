const CourseLandingPage = require(
  "../../admin/courseLandingPage/courseLandingPage.model"
);

function addDetailLinks(data) {
  for (const key of Object.keys(data)) {
    const section = data[key];

    if (
      section &&
      typeof section === "object" &&
      Array.isArray(section.cards)
    ) {
      section.cards = section.cards.map((card) => ({
        ...card,
        detailLink: card.courseId
          ? `/api/v1/web/literature-courses/${card.courseId}`
          : null,
      }));
    }
  }

  return data;
}

/**
 * GET Landing Page
 */
exports.getCourseLandingPage = async (req, res) => {
  try {
    const data = await CourseLandingPage.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Course landing page data not found",
      });
    }

    addDetailLinks(data);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET Single Card By courseId
 */
exports.getCourseLandingPageById = async (req, res) => {
  try {
    const { id } = req.params;

    const landingPage = await CourseLandingPage.findOne().lean();

    if (!landingPage) {
      return res.status(404).json({
        success: false,
        message: "Landing page not found",
      });
    }

    for (const key of Object.keys(landingPage)) {
      const section = landingPage[key];

      if (
        section &&
        typeof section === "object" &&
        Array.isArray(section.cards)
      ) {
        const card = section.cards.find(
          (item) => String(item.courseId) === String(id)
        );

        if (card) {
          return res.status(200).json({
            success: true,
            data: {
              ...card,
              detailLink: `/api/v1/web/literature-courses/${card.courseId}`,
            },
          });
        }
      }
    }

    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};