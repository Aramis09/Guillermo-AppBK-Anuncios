const { User ,Size, Importance,Section } = require("../db")
const catchingErrors = require("../utils/errors/catchingErrors")

const {
  USER_VALUE,
  PASSWORD_VALUE
} = process.env;
module.exports = catchingErrors( async (req,res,next) => {
  const arrSizes = await Size.findAll();
  const arrImportances = await Importance.findAll();
  const userAdminFound = await User.findByPk(1)
  const sectionsFound = await Section.findAll()

  if(!arrSizes.length) {
    await Size.bulkCreate([
      { size: 1 },
      { size: 2 },
      { size: 3 },
      { size: 4 },
      { size: 5 },
    ]);
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
    await User.create({
      user: !USER_VALUE ? null : USER_VALUE,
      password: !PASSWORD_VALUE ? null : PASSWORD_VALUE,
    })}

  next()
})