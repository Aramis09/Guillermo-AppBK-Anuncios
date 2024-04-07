const { default: axios } = require("axios");
const catchingErrors = require("../../../src/utils/errors/catchingErrors");

const getImagesController = async (req, res) => {
    const imagesFromCloudinary =((await axios.get("http://res.cloudinary.com/dijcnnfhw/image/list/anuncios.json")).data)
    res.status(200).json({
      images:imagesFromCloudinary
    });
};

module.exports = { getImagesController:catchingErrors(getImagesController) };