const path = require('path')

// import router
const { Router } = require('express')
const router = new Router()

// middleware
const auth = require('../middlewares/auth')

// controllers
const { loginUser, registerUser } = require('../controllers/user.controller')
const controller = require("../controllers/products.js")
const Contenedor = require(path.join(__dirname, "../models/contenedor.js"));
const products = new Contenedor(path.join(__dirname, "../database/data.json"))


// GET Main
router.get('/', auth, (req, res) => {
    const { name } = req.session.user
    res.render('main', {name})
})

// GET Login
router.get('/login', (req, res) => res.render('login'))

// POST Login
router.post("/login", loginUser)

// GET Register
router.get('/register', (req, res) => res.render('register'))

// POST Register
router.post("/register", registerUser)


router.get('/logout', auth, (req, res) => {
    const { name } = req.session.user
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            res.send(err)
            return
        }
    })
    res.render('logout', {name})
}) 

//guardo los datos agregados desde el formulario con method=post para mongo
router.post("", controller.post)

/* router.post('/', async (req, res) => {
    const save = await products.save(req.body)
    console.log(save)
    res.redirect("/")
}) */




module.exports = router