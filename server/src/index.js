const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')


require('dotenv').config()
const middlewares = require('./middlewares')
const logs = require('./api/logs')


const app = express()
app.use(morgan('common'));
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.use(express.json())


const port = process.env.PORT || 1337;


app.get('/', (req, res) => {
    res.json({ message: 'hello World' })
})


app.use('/api/logs',logs)

app.use(middlewares.notFound)

app.use(middlewares.errorStack)

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {

        app.listen(port, () => {
            console.log(`Listeing @  http://localhost:${port}`)
        })
    }
)
