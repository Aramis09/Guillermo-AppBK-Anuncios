const { User } = require('../../src/db');
const catchingErrors = require("../../src/utils/errors/catchingErrors")
require('dotenv').config();
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken"

)
const createUser = async (req,res) => {
  const { user,password } = req.body

  const salt =  await bcrypt.genSalt(10);
  const passwordEncrypt =  await bcrypt.hash(password, salt);
  
  const newAdmin = await User.create({
    user:user,
    password:passwordEncrypt
  })
  return res.status(200).send(newAdmin)
}


const loginController =  async (req,res)=> {
  const {user, password} = req.body
  const userFound = await User.findOne({
    where:{
      user
    }
  })
  if(!userFound) return res.status(401).send({
    user: "",
    validPassword: false,
    token: "",
    error:true
  })
  const validPassword = await bcrypt.compare(password, userFound.password);
  if(!validPassword) return res.status(401).send({
    user: "",
    validPassword: false,
    token: "",
    error:true
  })
  const token = jwt.sign({
    name: userFound.name,
    id: userFound.dataValues.id
  }, process.env.TOKEN_SECRET)

  res.cookie("messiEntroAJugar",token,{
    maxAge:1000*3600*7, //PONEMOS EL TIEMPO DE VIDA DEL TOKEN
    httpOnly:false,
    secure:true, //!IMPORTANTE, HAY QUE PASARLO A TRUE y tennerlo en false en desarrollo
    sameSite: "lax"
  })

  return res.status(200).send({
    user,
    validPassword,
    token,
    error:false
  })
}

module.exports = {
  createUser: catchingErrors(createUser),
  loginController: catchingErrors(loginController)
}