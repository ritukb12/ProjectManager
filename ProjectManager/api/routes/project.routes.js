// business.route.js

const express = require('express');
const app = express();
const projectRoutes = express.Router();

// Require Business model in our routes module
let Project = require('../models/project');

// Defined store route
projectRoutes.route('/addproject').post(function (req, res) {
  let project = new Project(req.body);
  project.save()
    .then(project => {
      res.status(200).json({ 'Message': 'Project added successfully' });
    })
    .catch(err => {
      res.status(400).send({'Message': "Unable to save to database" + err});
    });
});




// Defined get data(index or listing) route
projectRoutes.route('/getallprojects').get(function (req, res) {
  Project.find(function (err, projects) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(projects);
    }
  });
});

// Defined edit route
projectRoutes.route('/getproject/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    if (err) {
      
      res.json({ success: false });
    }
    else {
      res.json(project);
    }


  });
});

//  Defined update route
projectRoutes.route('/updateproject/:id').post(function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (!project)
      res.status(200).json({ "Message": "Could not find Project to update" });
    else {
      project.project_name = req.body.project_name;
      project.parent_project_name = req.body.parent_project_name;
      project.start_date = req.body.start_date;
      project.end_date = req.body.end_date;
      project.priority = req.body.priority;
      // project.business_name = req.body.business_name;
      // project.business_gst_number = req.body.business_gst_number;

      project.save()
        .then(project => {
          res.json({ "Message": "Update completed successfully"});
        })
        .catch(err => {
          res.status(400).send({ "Message": "Update unsuccessful"});
        });
    }
  });
});


// Defined delete | remove | destroy route
projectRoutes.route('/deleteproject/:id').get(function (req, res) {
  Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    if (err) {
      console.log("Error:", err);
      res.json({ success: false });
    }
    else res.json({ "Message": "Successfully removed" });
  });
});

projectRoutes.route('/sortprojects/:byCol').get(function (req, res) {
  var col = req.params.byCol;
  if (col == 'start_date') {
    Project.find().sort({ start_date: 1 }).
      then(project => {
        res.json(project);
      })
      .catch(err => {
        res.status(400).send({ "Message": "Sort unsuccessful" });
      });
  } else if (col == 'end_date') {
    Project.find().sort({ end_date: 1 }).
      then(project => {
        res.json(project);
      })
      .catch(err => {
        res.status(400).send({ "Message": "Sort unsuccessful" });
      });
  }
  else if (col == 'taskended') {
    Project.find().sort({ taskended: 1 }).
      then(project => {
        res.json(project);
      })
      .catch(err => {
        res.status(400).send({ "Message": "Sort unsuccessful" });
      });
  }
  else {
    Project.find().sort({ priority: 1 }).
    then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(400).send({ "Message": "Sort unsuccessful" });
    });
  }
});

module.exports = projectRoutes;

