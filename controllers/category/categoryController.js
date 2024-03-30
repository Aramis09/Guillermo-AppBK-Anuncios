const { Category } = require("../../src/db");
const catchingErrors = require("../../src/utils/errors/catchingErrors");

const createCategory = async (req, res) => {
  const { categories } = req.body;
  console.log(categories, "<<<<----");
  const arrCategoriesFormated = categories.map((category) => ({
    name: category,
  }));
  let result = await Category.bulkCreate(arrCategoriesFormated);
  res.status(200).json({
    message: "it was created",
    data: result,
  });
};

const getCategory = async (req, res) => {
  const list = await Category.findAll();
  res.status(200).json({
    message: "it was created",
    data: list,
  });
};

module.exports = {
  createCategory: catchingErrors(createCategory),
  getCategory: catchingErrors(getCategory),
};
