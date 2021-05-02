const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth')

/**
 * @route     GET /api/sub/
 * @desc      Get all subjects (for development only)
 * @access    Public
 */
router.get('/', handle.getallsubject); // for development only

/**
 * @route     POST /api/sub/add
 * @desc      Post a subject 
 * @access    Private Admin Only
 */
router.post('/add', handle.addsubject);

/**
 * @route     POST /api/sub/user/add
 * @desc      Post a subject for user
 * @access    Private Admin Only
 */
router.post('/user/add', auth,handle.addmysubject);

/**
 * @route     GET /api/sub/user/
 * @desc      Post a subject for user
 * @access    Private Admin Only
 */
router.get('/user/', auth,handle.getmysubject);

module.exports = router;
