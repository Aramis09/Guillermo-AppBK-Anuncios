const { Router } = require('express');
const { createUser }  = require('../../../controllers/user/userController.js');
const { Dog,Temper } = require('../../db.js');
const router = Router();

router.post('/', createUser);


router.get('/', async (req, res)=>{
    
});


router.delete('/:id', async (req, res)=>{

});


module.exports = router;