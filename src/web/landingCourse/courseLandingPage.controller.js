const CourseLandingPage = require(
  "../../admin/courseLandingPage/courseLandingPage.model"
);


// WEB GET ALL DATA
exports.getCourseLandingPage = async (req, res) => {
  try {
    const data = await CourseLandingPage.findOne();

    console.log("========== DB DATA ==========");
    console.log(JSON.stringify(data, null, 2));

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Course landing page data not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// WEB GET BY ID

exports.getCourseLandingPageById = async(req,res)=>{

try{

const data = await CourseLandingPage.findById(
  req.params.id
);


if(!data){

return res.status(404).json({
 success:false,
 message:"Course landing page not found"
});

}


res.status(200).json({
 success:true,
 data
});


}catch(error){

res.status(500).json({
 success:false,
 message:error.message
});

}

};