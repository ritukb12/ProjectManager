// business.route.js

const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require Business model in our routes module
let User = require('../models/user');
//let ParentTask = require('../models/parentuser');

// Defined store route
userRoutes.route('/adduser').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({ 'Message': 'User added successfully' });
    })
    .catch(err => {
      res.status(400).send({ 'Message': "Unable to save to database" + err });
    });
});




// Defined get data(index or listing) route
userRoutes.route('/getallusers').get(function (req, res) {
  User.find(function (err, user) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(user);
    }
  });
});

// Defined edit route
userRoutes.route('/getuser/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      res.json({ success: false });
    }
    else {
      res.json(user);
    }


  });
});

//  Defined update route
userRoutes.route('/updateuser/:id').post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user)
      res.status(200).json({ "Message": "Could not find User to update" });
    else {
      user.user_fname = req.body.user_fname;
      user.user_lname = req.body.user_lname;
      user.empID = req.body.user_empid;
      // user.business_name = req.body.business_name;
      // user.business_gst_number = req.body.business_gst_number;

      user.save()
        .then(user => {
          res.json({ "Message": "Update completed successfully" });
        })
        .catch(err => {
          res.status(400).send({ "Message": "Update unsuccessful" });
        });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) {
      console.log("Error:", err);
      res.json({ success: false });
    }
    else res.json({ "Message": "Successfully removed" });
  });
});


userRoutes.route('/sortusers/:byCol').get(function (req, res) {
  var col = req.params.byCol;
  if (col == 'user_fname') {
    User.find().sort({ user_fname: 1 }).
      then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(400).send({ "Message": "Sort unsuccessful" });
      });
  } else if (col == 'user_lname') {
    User.find().sort({ user_lname: 1 }).
      then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(400).send({ "Message": "Sort unsuccessful" });
      });
  }
  else {
    User.find().sort({ user_empID: 1 }).
    then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).send({ "Message": "Sort unsuccessful" });
    });
  }
});

module.exports = userRoutes;

