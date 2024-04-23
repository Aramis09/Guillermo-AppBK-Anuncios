const { Router } = require('express');
const { getPostByOwner,getPostDetail,timerDeletePostExpired,getPostsByCategories, createPost, getPosts ,editPost, deletePost } = require('../../../controllers/posting/postingController');
const router = Router();


router.get('/',timerDeletePostExpired ,getPosts);
router.get('/getListFiltered',getPostsByCategories);
router.get('/getPostDetail',getPostDetail);
router.get('/getPostByOwner',getPostByOwner);


router.post('/',createPost);
router.put('/',editPost);
router.delete('/',deletePost);
// router.use("/timerDelete",timerDeletePostExpired)


module.exports = router;