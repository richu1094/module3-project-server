require('dotenv').config()
require('./db')

const express = require('express')
const app = express()


// TODO: DESACOPLAR CONTROLADORES

require('./config')(app)

require('./routes')(app)

require('./error-handling')(app)

module.exports = app
