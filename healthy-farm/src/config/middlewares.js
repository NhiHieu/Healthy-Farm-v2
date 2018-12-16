const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')

module.exports = function configMiddleware(app){
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
    
    app.use(morgan('tiny'))

    app.use(cookieParser())
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions',
            cookie: {expires: 100*24*60*60}
        })
    }))

    app.use((req, res, next) =>{
        if(req.cookies.user_sid && !req.session.user)
            res.clearCookie('user_sid')
        next()
    })

    console.log("dirname:" + __dirname)
    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'ejs')

    app.use(express.static(path.join(__dirname, '../public')))
}