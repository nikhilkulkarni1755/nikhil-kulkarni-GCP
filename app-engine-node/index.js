let express = require('express')

let app = express()

let normalizePort = require('normalize-port')

var port = normalizePort(process.env.PORT || '4000');

app.get('/test', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/angular', (req, res) => {
    res.send('<h1>This project has been created with Node and Angular</h1>')
})

// app.use('/angular', require(express.static('frontend')))

app.use(express.static('frontend'))

app.listen(port, () => {
    console.log('Node server is running @ http://localhost:4000')
})