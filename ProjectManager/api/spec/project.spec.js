var request = require('supertest');
//const taskRoute = require('./routes/task.routes');
var app = require('../server');

describe("ProjectManager Server", function () {

  describe("Rest API GET Get all projects /", function () {
    it("returns status code 200 and a response", function (done) {
      request(app)
        .get("http://localhost:4000/project/getallprojects")
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

  describe("Rest API GET Project by Project ID /", function () {
    it("with incorrect task ID returns 200 with success false", function (done) {
      request(app)
        .get("http://localhost:4000/project/getproject")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({ "success": false });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });

  describe("Rest API GET Project by Project ID /", function () {
    it("with incorrect task ID returns 200 with success false", function (done) {
      request(app)
        .get("http://localhost:4000/project/getproject")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({ "success": false });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });


  describe("Rest API to sort projects /", function () {
    it("returns status code 200", function (done) {
      request(app)
        .get("http://localhost:4000/project/sortprojects/start_date")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    describe("Rest API to create Project ", function () {

      it("should create a project", function (done) {
        request(app)
          .post("http://localhost:4000/project/addproject")
          .send({
            Project_name: "test proj",
            start_date: '12/12/2019',
            end_date: '12/12/2019',
            priority: '50',
            projectended: false,
            manager_ID: 'abc'
          })
          .expect(function (res) {
            expect(res.statusCode).toBe(200);
            expect(req.body).toEqual({ "Message": "Project added successfully" });
          })
          .end(function (err) {
            expect(err).toBeDefined();
            done();
          })
      });

    });

    describe("Rest API to suspend Project ", function () {
      it("with incorrect task ID returns 200 with failure message", function (done) {
        request(app)
          .post("http://localhost:4000/task/suspendproject/1")
          .expect(function (res) {
            expect(res.statusCode).toBe(200);
            expect(req.body).toEqual({ "Message": "Could not find Project to suspend" });
          })
          .end(function (err) {
            expect(err).toBeDefined();
            done();
          })
      });
    });
  });

  describe("Rest API to update Task ", function () {
    it("with incorrect project ID returns 200 with success false", function (done) {
      request(app)
        .get("http://localhost:4000/project/update/1")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
          expect(req.body).toEqual({ "Message": "Could not find Project to update" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });

});