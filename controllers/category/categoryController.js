const { Category } = require("../../src/db");
const catchingErrors = require("../../src/utils/errors/catchingErrors");

const createCategory = async (req, res) => {
  const { categories } = req.body;
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
  const list = await Category.findAll({
    order:[["name","ASC"]]
  });
  res.status(200).json({
    message: "it was created",
    data: list,
  });
};

const deleteCategory = async (req, res) => {
  const { name } = req.body
  const list = await Category.destroy({
    where:{
      name
    }
  });
  res.status(200).json({
    message: "it was created",
    data: list,
  });
};


module.exports = {
  createCategory: catchingErrors(createCategory),
  getCategory: catchingErrors(getCategory),
  deleteCategory: catchingErrors(deleteCategory),

};
