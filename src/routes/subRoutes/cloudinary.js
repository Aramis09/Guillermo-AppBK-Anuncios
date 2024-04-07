
const { Router } = require('express');
const { getImagesController } = require('../../../controllers/cloudinary/getImagesController/getImagesController');
const { deleteImageFromCloudinary } = require('../../../controllers/cloudinary/deleteImage/deleteImageController');

const router = Router();


router.get('/images', getImagesController);
router.delete('/images', deleteImageFromCloudinary);


module.exports = router;