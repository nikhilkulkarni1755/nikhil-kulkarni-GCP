// import requestIp from 
let requestIp = require('request-ip')

require("dotenv").config()

let cors = require('cors')

//console.log(process.env.IP_INFO_KEY)

let express = require('express')

let app = express()

app.use(cors())

app.use(requestIp.mw())


let normalizePort = require('normalize-port')

var port = normalizePort(process.env.PORT || '4000');

// app.get('/test', (req, res) => {
//     res.send('<h1>Hello World</h1>')
// })

app.get('/ip', (req, res) => {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:'+4200);
    // var ip = req.ip
    var ip = req.clientIp;
    // var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    var token = process.env.IP_INFO_KEY
    var promise = "https://ipinfo.io/" + ip + "/json?token=" + token
    // console.log(promise)

    fetch(promise).then(
      (response) => response.json()
    ).then(
      (jsonResponse) => {
        // console.log(jsonResponse.ip, jsonResponse.country)
        foundlocation = jsonResponse.city + ", " + jsonResponse.region + ", " + jsonResponse.country
        // console.log('Location in fxn: ' + foundlocation)
        res.send(foundlocation)
      }
    )
})

app.get('/f1', (req, res) => {
  var promise = 'http://ergast.com/api/f1/2023/15/results.json'
  fetch(promise).then(
    (response) => response.json()
  ).then(
    (jsonResponse) => {
      res.send(jsonResponse)
    }
  )
})

app.get('/angular', (req, res) => {
    res.send('<h1>This project has been created with Node and Angular</h1>')
})

app.get('*', (req, res) => {
  res.send('<h1>Nikhil Kulkarni has created this server</h1>')
})

// app.post('*', function(req, res, next) {
//   if(getIP === null) {
//     console.log('did not find ip address')
//   }
//   var data = req.body.params
//   console.log(req.data)
// })

// app.use('/angular', require(express.static('frontend')))

// app.use(express.static('frontend'))

app.listen(port, () => {
    console.log('Node server is running @ http://localhost:4000')
})


