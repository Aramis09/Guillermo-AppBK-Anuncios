const { Category } = require("../../src/db")
const catchingErrors = require("../../src/utils/errors/catchingErrors")

const createCategory = async (req, res) => {
    const { categories } = req.body
    const arrCategoriesFormated = categories.map( category => ({ name:category }))
    let result = await Category.bulkCreate(arrCategoriesFormated);
    res.status(200).json({
        message:"it was created",
        data:result,
        arrCategoriesFormated
    })
}


module.exports = {
    createCategory:catchingErrors(createCategory)
}