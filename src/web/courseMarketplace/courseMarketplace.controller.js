const CourseMarketplace = require(
    "../../admin/courseMarketplace/courseMarketplace.model"
);


// exports.searchCourses = async (req, res) => {
//     try {
//         const {
//             keyword,
//             category,
//             duration,
//             minPrice,
//             maxPrice,
//             name,
//             subject,
//             partner,
//             program,
//             language,
//             availability,
//             learningType
//         } = req.body;

//         const data = await CourseMarketplace.findOne().lean();
//         console.log(data, "data1212233333333312222211!112222222!!!")

//         if (!data) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Data not found"
//             });
//         }

//         // Search Creators
//         if (name) {
//             const creators =
//                 data.classesTaughtByCreators?.cards || [];

//             const result = creators.filter(
//                 item =>
//                     item.name &&
//                     item.name.toLowerCase().includes(
//                         name.toLowerCase()
//                     )
//             );

//             if (result.length === 0) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Creator not found"
//                 });
//             }

//             return res.status(200).json({
//                 success: true,
//                 count: result.length,
//                 data: result
//             });
//         }

//         // Search Courses
//         let courses = [
//             ...(data.featuredCourses?.cards || []),
//             ...(data.recommendedForYou?.cards || [])
//         ];

//         if (keyword) {
//             courses = courses.filter(
//                 item =>
//                     item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
//                     item.description?.toLowerCase().includes(keyword.toLowerCase())
//             );
//         }

//         if (category) {
//             courses = courses.filter(
//                 item =>
//                     item.category?.toLowerCase() ===
//                     category.toLowerCase()
//             );
//         }

//         // if (duration) {
//         //   courses = courses.filter(
//         //     item =>
//         //       item.duration?.toLowerCase() ===
//         //       duration.toLowerCase()
//         //   );
//         // }


//         if (duration) {
//             courses = courses.filter(
//                 item =>
//                     item.duration &&
//                     item.duration.toLowerCase().includes(
//                         duration.toLowerCase()
//                     )
//             );
//         } console.log("AFTER FILTER:", courses);
//         if (minPrice) {
//             courses = courses.filter(
//                 item => item.price >= Number(minPrice)
//             );
//         }

//         if (maxPrice) {
//             courses = courses.filter(
//                 item => item.price <= Number(maxPrice)
//             );
//         }

//         if (courses.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             count: courses.length,
//             data: courses
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
exports.searchCourses = async (req, res) => {
  try {
    const {
      keyword,
      category,
      duration,
      minPrice,
      maxPrice,
      name,
      subject,
      partner,
      program,
      language,
      availability,
      learningType,
    } = req.body;

    const data = await CourseMarketplace.findOne().lean();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    // =========================
    // Creator Search
    // =========================
    if (name) {
      const creators =
        data.classesTaughtByCreators?.cards || [];

      const result = creators.filter(
        (item) =>
          item.name &&
          item.name
            .toLowerCase()
            .includes(name.toLowerCase())
      );

      return res.status(200).json({
        success: true,
        count: result.length,
        data: result,
      });
    }

    // =========================
    // Hero Section Search
    // =========================
    if (
      subject ||
      partner ||
      program ||
      language ||
      availability ||
      learningType
    ) {
      const hero = data.heroSection || {};

      const result = {};

      if (subject) {
        result.heroSection = {
          subjects: (hero.subjects || []).filter((item) =>
            item.toLowerCase().includes(subject.toLowerCase())
          ),
        };

        result.featuredCourses = (
          data.featuredCourses?.cards || []
        ).filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() ===
              subject.toLowerCase()
        );

        result.recommendedForYou = (
          data.recommendedForYou?.cards || []
        ).filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() ===
              subject.toLowerCase()
        );
      }

      if (partner) {
        result.partners = (hero.partners || []).filter(
          (item) =>
            item
              .toLowerCase()
              .includes(partner.toLowerCase())
        );
      }

      if (program) {
        result.programs = (hero.programs || []).filter(
          (item) =>
            item
              .toLowerCase()
              .includes(program.toLowerCase())
        );
      }

      if (language) {
        result.languages = (hero.languages || []).filter(
          (item) =>
            item
              .toLowerCase()
              .includes(language.toLowerCase())
        );
      }

      if (availability) {
        result.availability = (
          hero.availability || []
        ).filter((item) =>
          item
            .toLowerCase()
            .includes(availability.toLowerCase())
        );
      }

      if (learningType) {
        result.learningTypes = (
          hero.learningTypes || []
        ).filter((item) =>
          item
            .toLowerCase()
            .includes(learningType.toLowerCase())
        );
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    }

    // =========================
    // Course Search
    // =========================
    let courses = [
      ...(data.featuredCourses?.cards || []),
      ...(data.recommendedForYou?.cards || []),
    ];

    if (keyword) {
      courses = courses.filter(
        (item) =>
          item.title
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          item.description
            ?.toLowerCase()
            .includes(keyword.toLowerCase())
      );
    }

    if (category) {
      courses = courses.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() ===
            category.toLowerCase()
      );
    }

    if (duration) {
      courses = courses.filter(
        (item) =>
          item.duration &&
          item.duration
            .toLowerCase()
            .includes(duration.toLowerCase())
      );
    }

    if (minPrice) {
      courses = courses.filter(
        (item) =>
          Number(item.price) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      courses = courses.filter(
        (item) =>
          Number(item.price) <= Number(maxPrice)
      );
    }

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
function addDetailLinks(data) {
    if (!data.recommendedForYou) return data;

    data.recommendedForYou.cards =
        data.recommendedForYou.cards.map(
            (card) => ({
                ...card,
                detailLink: card.courseId
                    ? `/api/v1/web/literature-courses/${card.courseId}`
                    : null,
            })
        );

    return data;
}

exports.getCourseMarketplace =
    async (req, res) => {
        try {
            const data =
                await CourseMarketplace.findOne()
                    .sort({
                        createdAt: -1,
                    })
                    .lean();

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data not found",
                });
            }

            addDetailLinks(data);
            console.log(
                JSON.stringify(data.featuredCourses, null, 2)
            );
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

exports.getCourseMarketplaceById =
    async (req, res) => {
        try {
            const data =
                await CourseMarketplace.findById(
                    req.params.id
                ).lean();

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data not found",
                });
            }

            addDetailLinks(data);

            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };