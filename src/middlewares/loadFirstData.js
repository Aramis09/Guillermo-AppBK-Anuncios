const { User ,Size, Importance,Section } = require("../db")
const catchingErrors = require("../utils/errors/catchingErrors")
const bcrypt = require("bcrypt") 

const {
  USER_VALUE,
  PASSWORD_VALUE
} = process.env;

module.exports = catchingErrors( async (req,res,next) => {
  const arrSizes = await Size.findAll();
  const arrImportances = await Importance.findAll();
  const userAdminFound = await User.findByPk(1)
  const sectionsFound = await Section.findAll()
  console.log(arrSizes);

  if(!arrSizes.length) {
    console.log("entre");
    const result = await Size.bulkCreate([
      { size: 1 },
      { size: 2 },
      { size: 3 },
      { size: 4 },
      { size: 5 },
    ]);
  console.log(result,"<<------------------------");

  }

  if(!arrImportances.length) {
    await Importance.bulkCreate([
      { importance: "A" },
      { importance: "B" },
      { importance: "C" },
      { importance: "D" },
      { importance: "E" },
    ]);
  }

  if(!sectionsFound.length) {
    await Section.bulkCreate([
      { name: "Events" },
      { name: "Main" },
      { name: "Useful Information" },
    ]);
  }

  if(!userAdminFound){

    const salt =  await bcrypt.genSalt(10);
    const passwordEncrypt =  await bcrypt.hash(!PASSWORD_VALUE ? null : PASSWORD_VALUE, salt);
    
    const newAdmin = await User.create({
      user:!USER_VALUE ? null : USER_VALUE,
      password:passwordEncrypt
    })
  }
  next()
})