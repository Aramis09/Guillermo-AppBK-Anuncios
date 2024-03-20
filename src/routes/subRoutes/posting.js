const { Router } = require('express');
const { getPostsByCategories, createPost, getPosts ,editPost, deletePost } = require('../../../controllers/posting/postingController');
const router = Router();


router.get('/',getPosts);
router.get('/getListFiltered',getPostsByCategories);

router.post('/',createPost);
router.put('/',editPost);
router.delete('/',deletePost);


module.exports = router;