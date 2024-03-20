const { Router } = require('express');
const { createCategory } = require('../../../controllers/category/categoryController');
const router = Router();


router.post('/',createCategory);


module.exports = router;