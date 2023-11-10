
// const https = require("https")

const nodemailer = require('nodemailer')
// import requestIp from 
let requestIp = require('request-ip')

require("dotenv").config()

let cors = require('cors')

let express = require('express')

let app = express()

app.use(cors())

app.use(requestIp.mw())


let normalizePort = require('normalize-port')
const Mail = require('nodemailer/lib/mailer')

var port = normalizePort(process.env.PORT || '4000');

// const request = await fetch("https://ipinfo.io/json?token="+ipKey)
// const json = await request.json()

app.get('/contactMe', (req, res) => {
  // name, email and message are being sent via email

  // req.query.email
  
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user:"nodejsserverstuff@gmail.com",
      pass:process.env.SERVER_KEY
    }
  })

  subject = 'Thanks for Contacting Nikhil, ' + req.query.name
  maillist = [
    req.query.email,
    'nikhilkulkarni1755@gmail.com',
  ]

  const mailOptions = {
        from:"nodejsserverstuff@gmail.com",
        to: maillist,
        subject:subject,
        text:"Got your message (" + req.query.message + "). Will respond as soon as possible"
      }
    
      transporter.sendMail(mailOptions, function(error, res) {
        if(error) {
          // console.log(error)
          res.send({status:error})
        }
        else {
          // console.log('Sent email!' + res.response)
          res.send({status:'Sent email!'})
        }
        
  })
})

// app.get('/sendConfirm', (req, res) => {
//   let randomValue = Math.floor(Math.random() * (999999 - 100001 + 1) + 100001)
//   let time = Math.floor(Date.now()/1000)
//   const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth: {
//       user:"nodejsserverstuff@gmail.com",
//       pass:process.env.SERVER_KEY
//     }
//   })

//   const mailOptions = {
//     from:"nodejsserverstuff@gmail.com",
//     to:"nikhilkulkarni1755@gmail.com",
//     subject:"Email Confirmation: nsk1755.com",
//     text:"Random Value: " + randomValue
//   }

//   transporter.sendMail(mailOptions, function(error, res) {
//     if(error) {
//       console.log(error)
//     }
//     else {
//       console.log('Send email!' + res.response)
//     }
    
//     })
// })


app.get('/weather', (req, res) => {
  // console.log('trynna get the weather')
  // console.log(req.query.city + req.query.state + req.query.country) 
  // https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + weatherKey
  var promise = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.query.city + ',' + req.query.state + ',' + req.query.country + '&units=imperial&APPID=' + process.env.WEATHER_KEY
  // console.log(promise)
  fetch(promise).then(
    (response) => response.json()
  ).then(
    (jsonResponse) => {
      // console.log(jsonResponse)
      var weatherIcon = "https://openweathermap.org/img/w/" + jsonResponse.weather[0].icon + ".png";
      var weather = jsonResponse.weather[0].description;
      // console.log(weather)
      var temperature = Math.ceil(jsonResponse.main.temp) + "\xB0 F";
      // console.log(temperature)
      var city = jsonResponse.name;
      // console.log(city)
      var country = jsonResponse.sys.country;
      // console.log(country)

      res.send({icon: weatherIcon, weather: weather, temp: temperature, city: city, country: country})
    }
  )
})

app.get('/ip', (req, res) => {
    // NOT GOOD FOR TESTING
    var ip = req.clientIp;

    //FOR TESTING USE AN ACTUAL IP
    var token = process.env.IP_INFO_KEY
    var promise = "https://ipinfo.io/" + ip + "/json?token=" + token

    fetch(promise).then(
      (response) => response.json()
    ).then(
      (jsonResponse) => {
        foundlocation = jsonResponse.city + ", " + jsonResponse.region + ", " + jsonResponse.country
        const transporter = nodemailer.createTransport({
          service:"gmail",
          auth: {
            user:"nodejsserverstuff@gmail.com",
            pass:process.env.SERVER_KEY
          }
        })

        const mailOptions = {
          from:"nodejsserverstuff@gmail.com",
          to:"nikhilkulkarni1755@gmail.com",
          subject:"Ip Accessed from " + foundlocation,
          text:"Ip Accessed from " + foundlocation
        }

        transporter.sendMail(mailOptions, function(error, res) {
          if(error) {
            console.log(error)
          }
          else {
            console.log('Send email!' + res.response)
          }
          
          })
        res.send(foundlocation)

    })  
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

// https.createServer(app).listen(port, () => {
//   console.log('Node Server is running @ https://localhost:4000')
// })

app.listen(port, () => {
    console.log('Node server is running @ http://localhost:4000')
})


