const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const models = require('./models')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', routes)
app.use(express.static('./public'))
morgan('combined')

models.db.sync({force: true})
.then(() => {
    app.listen(3000, () => {
        console.log('Server levantado en: http://localhost:3000')
    })
})
.catch((err) => {
    console.log(err)
})