const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');


const { mongoose } = require('./db-connect/mongoose');
const { Leader } = require('./models/leader');
const { Volunteer } = require('./models/volunteer');
const { Admin } = require('./models/admin');
const { Request } = require('./models/request');
const { Announcement } = require('./models/announcement');
var cors = require("cors");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// POST /volunteer
app.post('/volunteer', (req, res) => {
  var body = _.pick(req.body, ['fName', 'lName', 'password', 'skills', 'phone', 'nationalId', 'email', 'placeOfOrigin', 'dob', 'uuid',]);
  var volunteer = new Volunteer(body);
  volunteer.save()
    .then(() => {
      res.status(200).send({ volunteer });
    }, (err) => {
      console.log(err);
      res.status(400).send(err);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

// GET /volunteer
app.get('/volunteer/:phone', (req, res) => {
  phone = req.params.phone;
  Volunteer.find({ phone }).then((volunteer) => {
    if (!volunteer) {
      return res.status(404).send("Volunteer not found!");
    }
    res.status(200).send({ volunteer });
  }).catch((err) => {
    console.log(err);
    res.status(400).send({ err });
  })
});

// PATCH /updateLocation/:phone:lng:lat
app.patch('/updateLocation/:phone/:lng/:lat', (req, res) => {
  phone = req.params.phone;
  var body = _.pick(req.body, ['fName', 'lName', 'phone', 'lat', 'lng']);

  Volunteer.findOneAndUpdate(phone, { '$set': { lat: req.params.lat, lng: req.params.lng } }, { 'new': true })
    .then((volunteer) => {
      if (!volunteer) {
        res.status(404).send("User not found!");
      }
      res.status(200).send({ volunteer });
    }).catch((err) => {
      res.status(400).send(err)
    })
});

// POST /announcement
app.post('/announcement', (req, res) => {
  text = req.body.text;
  var announcement = new Announcement({ text });
  announcement.save()
    .then((announcement) => {
      res.status(200).send({ announcement });
    }).catch((err) => {
      res.status(400).send({ err });
    });
});

// Get /announcement
app.get('/announcement', (req, res) => {
  Announcement.find({}).then((announcements) => {
    if(!announcements){
      res.status(404).send("No announcements found!");
    }
    else if(announcements.length === 1){
      res.status(200).send(announcements[0]);
    }
    res.status(200).send(announcements);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

// POST /request
app.post('/request', (req, res) => {
  var body = _.pick(req.body, ['text', 'lat', 'lng']);
  var request = new Request(body);
  request.save()
    .then((request) => {
      res.status(200).send({ request });
    }).catch((err) => {
      res.status(400).send({ err });
    })
});

// Get /announcement
app.get('/request', (req, res) => {
  Request.find({}).then((requests) => {
    if(!requests){
      res.status(404).send("No requests found!");
    }
    else if(requests.length === 1){
      res.status(200).send(requests[0]);
    }
    res.status(200).send(requests);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

// GET /leader/:phone
app.get('/leader/:phone', (req, res) => {
  phone = req.params.phone;
  Leader.find({ phone }).then((leader) => {
    if (!leader) {
      return res.status(404).send("Leader not found!");
    }
    res.status(200).send({ leader });
  }).catch((err) => {
    console.log(err);
    res.status(400).send({ err });
  })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };