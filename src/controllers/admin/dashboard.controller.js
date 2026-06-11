const User =
  require("../../models/User");

const Course =
  require("../../models/Course");

exports.dashboard =
async (req,res)=>{

  const totalUsers =
  await User.countDocuments();

  const totalCourses =
  await Course.countDocuments();

  res.json({
    success:true,
    totalUsers,
    totalCourses
  });

};