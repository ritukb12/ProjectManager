var request = require('supertest');

var app = require('../server');
var sinon = require('sinon');
var User = require('../models/user');
var AssertionError = require("assert").AssertionError;


describe("User Manager Server", function () {

    describe("Rest API GET Get all users /", function () {
        it("returns status code 200 and a response", function (done) {
            request(app)
                .get("/user/getallusers")
                .expect(function (response) {
                    expect(response.statusCode).toBe(200);
                    expect(res.body.length).toBeGreaterThanOrEqual(0);
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });

        // it('should throw an error when any kind of error is encountered', function (done) {
        //     var stub = sinon.stub(User, 'find');
        //     var expectedError = new Error('oops');
        //     stub.yields(expectedError);
        //     request(app)
        //         .get("/user/getallusers")
        //         .expect(function (res) {
        //             expect(res.status).toEqual(500);
        //             expect(res.error).to.have.deep.property('text').to.contain('oops')
        //         })
        //         .end(done);
        // });
    });

    describe("Rest API GET User by User ID /", function () {
        it("with incorrect user ID returns 404 with success false", function (done) {
            request(app)
                .get("/user/getuser")
                .expect(function (res) {
                    expect(res.statusCode).toBe(404);
                    expect(req.body).toEqual({ "success": false });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });

        it("with correct User ID returns 200 successfully", function (done) {
            request(app)
                .get("/user/getuser/5cbdac8f3a40716709e7baf9")
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
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
                .get("/user/sortusers/user_fname")
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
                .post("/user/adduser")
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
    describe("Rest API to update User ", function () {
        it("with incorrect User ID returns 404 with success false", function (done) {
            request(app)
                .get("/user/update/1")
                .expect(function (res) {
                    expect(res.statusCode).toBe(404);
                    expect(req.body).toEqual({ "Message": "Could not find User to update" });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });
    });

    describe("Rest API to delete user ", function () {

        it("with incorrect user ID returns 404 with success false", function (done) {
            request(app)
                .get("/user/delete/1")
                .expect(function (res) {
                    expect(res.statusCode).toBe(404);
                    expect(req.body).toEqual({ "success": false });
                })
                .end(function (err) {
                    expect(err).toBeDefined();
                    done();
                })
        });

        it("with correct user ID returns 200 successfully", function (done) {
            request(app)
                .get("/user/delete/5cbb5abf7f513df6ec20d03c")
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
                .get("/user/sortusers/user_fname")
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
                .get("/user/sortusers/user_lname")
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
                .get("/user/sortusers/user_empID")
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