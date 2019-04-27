var request = require('supertest');
//const taskRoute = require('./routes/task.routes');
var app = require('../server');

describe("ProjectManager Server", function () {

  describe("Rest API GET Get all projects /", function () {
    it("returns status code 200 and a response", function (done) {
      request(app)
        .get("/project/getallprojects")
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
    it("with incorrect Project ID returns 404 with success false", function (done) {
      request(app)
        .get("/project/getproject/1")
        .expect(function (res) {
          expect(res.statusCode).toBe(404);
          expect(req.body).toEqual({ "success": false });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });


  describe("Rest API GET Project by Project ID /", function () {
    it("with correct Project ID returns 200", function (done) {
      request(app)
        .get("/project/getproject/5cbeeabee39464499c84c60a")
        .expect(function (res) {
          expect(res.statusCode).toBe(200);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });
  });


  describe("Rest API to sort projects /", function () {
    it("returns status code 200 when sorted by start date", function (done) {
      request(app)
        .get("/project/sortprojects/start_date")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("returns status code 200 when sorted by end date", function (done) {
      request(app)
        .get("/project/sortprojects/end_date")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("returns status code 200 when sorted by Project Name", function (done) {
      request(app)
        .get("/project/sortprojects/Project_name")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("returns status code 200 when sorted by Priority", function (done) {
      request(app)
        .get("/project/sortprojects/priority")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    
    it("returns status code 200 when sorted by Manager ID", function (done) {
      request(app)
        .get("/project/sortprojects/manager_ID")
        .expect(function (response) {
          expect(response.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("returns status code 200 when sorted by ProjectEnded", function (done) {
      request(app)
        .get("/project/sortprojects/projectended")
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
    describe("Rest API to create Project ", function () {

      it("should create a project", function (done) {
        request(app)
          .post("/project/addproject")
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
      it("with incorrect project ID returns 404 with failure message", function (done) {
        request(app)
          .post("/project/suspendproject/1")
          .expect(function (res) {
            expect(res.statusCode).toBe(404);
            expect(req.body).toEqual({ "Message": "Could not find Project to suspend" });
          })
          .end(function (err) {
            expect(err).toBeDefined();
            done();
          })
      });

      it("with correct project ID returns 200 with success message", function (done) {
        request(app)
          .post("/project/suspendproject/5cbeeabee39464499c84c60a")
          .expect(function (res) {
            expect(res.statusCode).toBe(200);
            expect(req.body).toEqual({ "Message": "Update successful" });
          })
          .end(function (err) {
            expect(err).toBeDefined();
            done();
          })
      });

    });

  describe("Rest API to update Project ", function () {
    it("with incorrect project ID returns 404 with success false", function (done) {
      request(app)
        .get("/project/updateproject/1")
        .expect(function (res) {
          expect(res.statusCode).toBe(404);
          expect(req.body).toEqual({ "Message": "Could not find Project to update" });
        })
        .end(function (err) {
          expect(err).toBeDefined();
          done();
        })
    });

    it("should update a project with the correct project ID", function (done) {
      request(app)
        .post("/project/updateproject/5cbeeabee39464499c84c60a")
        .send({
          Project_name: "main proj",
          start_date: '12/12/2019',
          end_date: '12/12/2019',
          priority: '50',
          projectended: false
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

});