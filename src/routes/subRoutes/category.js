const { Router } = require('express');
const { getCategory, createCategory, deleteCategory } = require('../../../controllers/category/categoryController');
const router = Router();


router.get('/',getCategory);
router.post('/',createCategory);
router.delete('/',deleteCategory);



module.exports = router;