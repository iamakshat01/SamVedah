const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth')
/**
 * @route     GET /api/auth
 * @desc      Get all users (for development only)
 * @access    Public
 */
router.get('/', handle.getUsers); // for development only

/**
 * @route     POST /api/auth/login
 * @desc      login a user
 * @access    Private
 */
router.post('/login', handle.login);

/**
 * @route     POST /api/auth/register
 * @desc      register a user
 * @access    Private
 */
router.post('/register', handle.register);

router.get('/profile', auth,handle.getUsersbyId);

module.exports = router;
