
// Controllers
const { getAllUsers } = require('../controllers/user.controller');


// Import router
const Router = require('express').Router;
const router = Router()



router.get('/', getAllUsers)

module.exports = router