const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth')

router.post('/accept', auth,handle.bementor);
router.get('/mentor', auth,handle.mymentees);
router.get('/mentee', auth,handle.mymentors);
router.get('/search',auth,handle.serachmentees);

module.exports = router;
