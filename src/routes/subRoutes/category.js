const { Router } = require('express');
const { getCategory, createCategory } = require('../../../controllers/category/categoryController');
const router = Router();


router.get('/',getCategory);
router.post('/',createCategory);


module.exports = router;