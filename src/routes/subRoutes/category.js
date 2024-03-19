const { Router } = require('express');
const { createCategory } = require('../../../controllers/category/categoryController');
const router = Router();


// router.get('/',getPosts);
router.post('/',createCategory);
// router.put('/',editPost);
// router.delete('/',deletePost);


module.exports = router;