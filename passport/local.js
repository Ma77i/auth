const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
// import models
const User = require("../models/userModel");


module.exports = (passport) => {
    // authenticate user
    const authenticateUser = async (email, password, done) => {
        try {
            if (!await User.exists({ email })) {
                console.log("Mail doesn't exists");
                return done(null, false, { message: "User doesn't exists" })
            }
            const user = await User.findOne({ email: email})

            user.password = await bcrypt.hash(user.password, 10)
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return done(null, false, { message: "Incorrect password" })
            }
            done(null, user)
        } catch (err) {
            done(err)
        }
    }
    
    // register user
    const registerUser = async (req, email, password, done) => {
        const { confirmPassword, firstName, lastName, userName, } = req.body
        
        try {
            if (await User.exists({ email })) {
                console.log("This mail already exists")
                return done(null, false, {
                    message: "This mail already exists, login"
                })
            }
            const user = await User.create({ email, password, confirmPassword, firstName, lastName, userName })
            done(null, {
                ...user,
                id: user._id,
            })
        } catch (err) {
            console.log(err)
            done(err)
        }
    }
    
    passport.use("login", new LocalStrategy({ usernameField: "email", passwordField: "password"}, authenticateUser))
    passport.use("register", new LocalStrategy({ usernameField: "email", passwordField: "password", passReqToCallback: true }, registerUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        done(null, await User.findById(id));
    })
}