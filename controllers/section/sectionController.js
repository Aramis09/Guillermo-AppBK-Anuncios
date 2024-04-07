const { Section } = require("../../src/db")
const catchingErrors = require("../../src/utils/errors/catchingErrors")

const createSection = async (req, res) => {
    const { sections } = req.body
    const arrSectionsFormated = sections.map( section => ({ name:section }))
    let result = await Section.bulkCreate(arrSectionsFormated);
    res.status(200).json({
        message:"it was created",
        data:result,
    })
}


const getSections = async (req, res) => {

    const  list = await Section.findAll()
    res.status(200).json({
        message:"it was created",
        data:list,
    })
}

module.exports = {
    createSection:catchingErrors(createSection),
    getSections:catchingErrors(getSections)

}