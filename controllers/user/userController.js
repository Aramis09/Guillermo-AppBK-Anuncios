const { User } = require('../../src/db');
const catchingErrors = require("../../src/utils/errors/catchingErrors")

const createUser = async (req, res)=>{
  const { user,password } = req.body
  const newUser = await User.create({
    user: user,
    password: password
  })
  return res.status(200).json(newUser)
}

module.exports = {
  createUser: catchingErrors(createUser)
}