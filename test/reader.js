// reader.js
/* jshint node: true */
"use strict"

var should = require("should");
var LineReader = require("../lib/reader");

describe("LineReader - light test", function() {

	let testReader = null;

	it("constructor", function() {
		testReader = new LineReader("./test/test-file.txt");
		should.exist(testReader);
	});

	it("should open test file", function(done) {
		testReader.open(done);
	});

	it("should read a line", function(done) {
		testReader.read(function(err, line) {
			should.not.exist(err);
			should.exist(line);
			line.should.match("Test");
			done();
		});
	});

	it("should close test file", function(done) {
		testReader.close(done);
	});

	it("should re-open the file", function(done) {
		testReader.open(done);
	});

	it("should re-read a line", function(done) {
		testReader.read(function(err, line) {
			should.not.exist(err);
			should.exist(line);
			line.should.match("Test");
			done();
		});
	});

	it("should re-close test file", function(done) {
		testReader.close(done);
	});

});

describe("LineReader - load test", function() {
	this.timeout(60000);

	let testReader = null;

	it("constructor (with small buffer", function() {
		testReader = new LineReader("./test/test-file.txt", null, null, 4);
		should.exist(testReader);
	});

	it("should open test file", function(done) {
		testReader.open(done);
	});

	it("should read all remaining lines", function(done) {
		let lineCount = 0;
		testReader.readEachSeries(function(line, callback) {
			++lineCount;
			should.exist(line);
			line.should.be.a.String();
			return setImmediate(callback);
		}, function(err) {
			should.not.exist(err);
			lineCount.should.equal(31);
			done();
		});
	});

	it("should return undefined when reading beyond end of file", function(done) {
		testReader.read(function(err, line) {
			should.not.exist(err);
			should.not.exist(line);
			done();
		});
	});

	it("should close test file", function(done) {
		testReader.close(done);
	});

});