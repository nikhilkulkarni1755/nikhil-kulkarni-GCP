const nodemailer = require('nodemailer')
// import requestIp from 
let requestIp = require('request-ip')

// const tf = require('@tensorflow/tfjs-node');

const {spawn} = require('child_process');

require("dotenv").config()

let cors = require('cors')

let express = require('express')

let app = express()

app.use(cors())

app.use(requestIp.mw())

let normalizePort = require('normalize-port')
const Mail = require('nodemailer/lib/mailer')

var port = normalizePort(process.env.PORT || '4000');

app.get('/chess', (req, res) => {
  
})

app.get('/createDocs', (req, res) => {
  
})

app.get('/daysLeft', (req, res) => {
  var dataToSend;
  
  const python = spawn('python3', ['python/index.py']);

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  
  res.send(dataToSend)
  })
})

app.get('/contactMe', (req, res) => {
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
        text:"Got your message. Will respond as soon as possible\nMessage: " + req.query.message
      }
    
      transporter.sendMail(mailOptions, function(error, res) {
        if(error) {
          res.send({status:error})
        }
        else {
          res.send({status:'Sent email!'})
        }
        
  })
})

app.get('/weather', (req, res) => {
  
  var promise = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.query.city + ',' + req.query.state + ',' + req.query.country + '&units=imperial&APPID=' + process.env.WEATHER_KEY
  
  fetch(promise).then(
    (response) => response.json()
  ).then(
    (jsonResponse) => {
      var weatherIcon = "https://openweathermap.org/img/w/" + jsonResponse.weather[0].icon + ".png"
      var weather = jsonResponse.weather[0].description
      var temperature = Math.ceil(jsonResponse.main.temp) + "\xB0 F"
      var city = jsonResponse.name
      var country = jsonResponse.sys.country

      res.send({icon: weatherIcon, weather: weather, temp: temperature, city: city, country: country})
    }
  )
})

app.get('/ip', (req, res) => {
    // NOT GOOD FOR TESTING
    var ip = req.clientIp

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

app.listen(port, () => {
    console.log('Node server is running @ http://localhost:4000')
})
