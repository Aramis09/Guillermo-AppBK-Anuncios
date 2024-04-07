const catchingErrors = require("../../../src/utils/errors/catchingErrors")
const { deleteCloudImageHelper } = require("./helper/deleteHelper");

const deleteImageFromCloudinary = async (req,res)=>{
  await deleteCloudImageHelper(req.query)
  res.status(200).send("destroy")
}

module.exports = {
  deleteImageFromCloudinary:catchingErrors(deleteImageFromCloudinary)
}