const { Router } = require('express');
const user = require('./subRoutes/user.js');
const posting = require('./subRoutes/posting.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/user', user);
router.use('/posting', posting);


module.exports = router;
