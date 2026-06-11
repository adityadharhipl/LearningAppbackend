const LandingPage =
require("../../models/LandingPage");

exports.getLandingPage =
async(req,res)=>{

 try{

  const landing =
  await LandingPage.findOne();

  res.status(200).json({
   success:true,
   data:landing
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};