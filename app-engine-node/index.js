require("dotenv").config()

//console.log(process.env.IP_INFO_KEY)

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

app.post('*', function(req, res, next) {
  if(getIP === null) {
    console.log('did not find ip address')
  }
  var data = req.body.params
  console.log(req.data)
})

// app.use('/angular', require(express.static('frontend')))

app.use(express.static('frontend'))

app.listen(port, () => {
    console.log('Node server is running @ http://localhost:4000')
})

function getIP() {
    var token = process.env.IP_INFO_KEY
    var promise = "https://ipinfo.io/json?token=" + token
    console.log(promise)
    fetch(promise).then(
      (response) => response.json()
    ).then(
      (jsonResponse) => {
        // console.log(jsonResponse.ip, jsonResponse.country)
        location = jsonResponse.city + ", " + jsonResponse.region + ", " + jsonResponse.country
        console.log(location)

        return location
      }
    )
    
    return null

}
