const { Router } = require('express');
const { createUser,loginController }  = require('../../../controllers/user/userController.js');
const { keySecretVerify } = require('../../middlewares/ketSecretVerify.js');
const router = Router();

router.post('/', createUser);


router.post('/login' ,loginController);


router.delete('/:id', async (req, res)=>{

});


module.exports = router;