var request = require('supertest');
//const taskRoute = require('./routes/task.routes');
var app = require('../server');

describe("User Manager Server", function () {

    describe("Rest API GET Get all users /", function () {
        it("returns status code 200 and a response", function (done) {
            request(app)
                .get("http://localhost:4000/user/getallusers")
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

    describe("Rest API GET User by User ID /", function () {
        it("with incorrect task ID returns 200 with success false", function (done) {
            request(app)
                .get("http://localhost:4000/project/getuser")
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(req.body).toEqual({ "success": false });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });

        it("with correct User ID returns 200 successfully", function (done) {
            request(app)
                .get("http://localhost:4000/project/getuser/5cbb5abf7f513df6ec20d03c")
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.length).toBeGreaterThanOrEqual(0);
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });
    });

    describe("Rest API to sort users /", function () {
        it("returns status code 200", function (done) {
            request(app)
                .get("http://localhost:4000/project/getuser/user_fname")
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

    describe("Rest API to create User ", function () {

        it("should create a user", function (done) {
            request(app)
                .post("http://localhost:4000/user/adduser")
                .send({
                    user_fname: "test user",
                    user_lname: "test user",
                    user_empID: "123434"
                })
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(req.body).toEqual({ "Message": "User added successfully" });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });

    });

    describe("Rest API to create User ", function () {

        it("should not create a user and show an error", function (done) {
            request(app)
                .post("http://localhost:4000/user/adduser")
                .send({
                    user_fname: "test user",
                    user_lname: "test user",
                    user_empID: 123434
                })
                .expect(function (res) {
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toEqual({ 'Message': "Unable to save to database" });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });

    });


    describe("Rest API to update User ", function () {
        it("with incorrect User ID returns 200 with success false", function (done) {
            request(app)
                .get("http://localhost:4000/user/update/1")
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(req.body).toEqual({ "Message": "Could not find User to update" });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });
    });

    describe("Rest API to delete user ", function () {

        it("with incorrect user ID returns 200 with success false", function (done) {
            request(app)
                .get("http://localhost:4000/user/delete/1")
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(req.body).toEqual({ "success": false });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });

        it("with correct user ID returns 200 successfully", function (done) {
            request(app)
                .get("http://localhost:4000/user/delete/5cbb5abf7f513df6ec20d03c")
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

    describe("Rest API to sort users using fname/", function () {
        it("returns status code 200", function (done) {
            request(app)
                .get("http://localhost:4000/user/sortusers/user_fname")
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

    describe("Rest API to sort users using lname/", function () {
        it("returns status code 200", function (done) {
            request(app)
                .get("http://localhost:4000/user/sortusers/user_lname")
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

    describe("Rest API to sort users using empID/", function () {
        it("returns status code 200", function (done) {
            request(app)
                .get("http://localhost:4000/user/sortusers/user_empID")
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
});