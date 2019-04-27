var request = require('supertest');
//const taskRoute = require('./routes/task.routes');
var app = require('../server');

describe("TaskManager Server", function () {

  describe("Rest API GET viewTasks /", function () {
    it("returns status code 200 and a response", function (done) {
      request(app)
        .get("/task/viewTasks")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });

  describe("Rest API GET Task by Task ID /", function () {
    it("with incorrect task ID returns 404 with success false", function (done) {
      request(app)
        .get("/task/getTask/1")
        .expect(function (res) {
          expect(res.statusCode).toBe(404);
          expect(req.body).toEqual({ "success": false });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("with correct task ID returns 200 with success false", function (done) {
      request(app)
        .get("/task/getTask/5cbb64c57f513df6ec20d041")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });

  describe("Rest API GET Tasks by Project ID /", function () {
    it("with incorrect project ID returns 404 with success false", function (done) {
      request(app)
        .get("/task/gettasksbyproject/1.5")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({"Message": "Tasks with this projectID not found"});
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("with correct project ID returns 200 with success", function (done) {
      request(app)
        .get("/task/gettasksbyproject/5cbeeabee39464499c84c60a")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });

  describe("Rest API to sort tasks /", function () {
    it("by start_date returns status code 200", function (done) {
      request(app)
        .get("/task/sorttasks/start_date")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("by start_date returns status code 200", function (done) {
      request(app)
        .get("/task/sorttasks/start_date")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("by end_date returns status code 200", function (done) {
      request(app)
        .get("/task/sorttasks/end_date")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("by priority returns status code 200", function (done) {
      request(app)
        .get("/task/sorttasks/priority")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("by taskended returns status code 200", function (done) {
      request(app)
        .get("/task/sorttasks/taskended")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });

  describe("Rest API to get all parent tasks /", function () {
    it("returns status code 200", function (done) {
      request(app)
        .get("/task/getAllParents")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });


  describe("Rest API to create Task ", function () {

    it("should create a task", function (done) {
      request(app)
        .post("/task/add")
        .send({
          task_name: 'jasmine task',
          //task_id: {type :Number },    
          parent_task_name: '',
          start_date: '12/12/2019',
          end_date: '12/12/2019',
          priority: '50',
          taskended: false
        })
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({ "Message": "task added successfully" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

  });
  describe("Rest API to delete task ", function () {

    it("with incorrect task ID returns 404 with success false", function (done) {
      request(app)
        .get("/task/delete/1")
        .expect(function (res) {
          expect(res.statusCode).toBe(404);
          expect(req.body).toEqual({ "success": false });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });


    it("with correct task ID returns 200 successfully", function (done) {
      request(app)
        .get("/task/delete/5c9b3fbc90d29c7d3cf0ca95")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({ "Message": "Successfully removed" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

  });


  describe("Rest API to update Task ", function () {
    it("with incorrect task ID returns 404 with success false", function (done) {
      request(app)
        .get("/task/update/1")
        .expect(function (res) {
          expect(res.statusCode).toBe(404);
          expect(req.body).toEqual({ "Message": "Could not find Task to update" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
    it("should update a task", function (done) {
      request(app)
        .post("/task/update/5cbb64c57f513df6ec20d041")
        .send({
          task_name: 'updated task',
          parent_task_name: '',
          start_date: '12/12/2019',
          end_date: '12/12/2019',
          priority: '51',
          taskended: false
        })
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({ "Message": "Update completed successfully" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });

  describe("Rest API to end Task ", function () {
    it("with incorrect task ID returns 404 with failure message", function (done) {
      request(app)
        .post("/task/endTask/1")
        .expect(function (res) {
          expect(res.statusCode).toBe(404);
          expect(req.body).toEqual({ "Message": "Could not find Task to end" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });


  describe("Rest API to end Task ", function () {
    it("should end a task", function (done) {
      request(app)
        .get("/task/endTask/5cbb64c57f513df6ec20d041")
        .send({
          taskended: true
        })
        .expect(function (res) {
          //expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({ "Message": "Update successful" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });


});
