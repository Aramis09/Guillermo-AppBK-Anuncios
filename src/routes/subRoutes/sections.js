const { Router } = require('express');
const { createSection, getSections } = require('../../../controllers/section/sectionController');
const router = Router();


router.get('/',getSections);
router.post('/',createSection);


module.exports = router;