const path = require('path')

// import router
const { Router } = require('express')
const router = new Router()

// middleware
const auth = require('../middlewares/auth')

// controllers
//const { loginUser, registerUser } = require('../controllers/user.controller')
const controller = require("../controllers/products.js")

// passport
const passport = require('passport')


// GET Main
router.get('/', auth, (req, res) => {
    const { firstName } = req.user
    res.render('main', { firstName })
})

// GET Login
router.get('/login', (req, res) => res.render('login'))


// POST Login
//router.post('/login', loginUser)
router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

// GET Register
router.get('/register', (req, res) => res.render('register'))

// POST Register
router.post("/register",
    passport.authenticate("register", {
        successRedirect: "/",
        failureRedirect: "/register",
        failureFlash: true
    })
)


router.get('/logout', auth, (req, res) => {
    const { firstName } = req.user
    console.log(firstName);

    req.logOut()
    res.render("logout", { firstName })
    // const { name } = req.session.user
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(err)
    //         return
    //     }
    // })
    // res.render('logout', { name })
})

//guardo los datos agregados desde el formulario con method=post para mongo
router.post("", controller.post)

/* router.post('/', async (req, res) => {
    const save = await products.save(req.body)
    console.log(save)
    res.redirect("/")
}) */




module.exports = router