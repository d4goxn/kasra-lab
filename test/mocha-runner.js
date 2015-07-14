process.env.NODE_PATH = "app";
require("module").Module._initPaths();
require("babel/register");
var uncache = require("require-uncache");

var _ = require("lodash");
var glob = require("glob").sync;
var Mocha = require("mocha");

var chokidar = require('chokidar');

// globals
var jsdom = require("jsdom");
global.document = jsdom.jsdom();
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.location = global.window.location;

// DEBUG = false;
// global.navigator.userAgent = "NodeJs JsDom";
// global.navigator.appVersion = "";

// global.sinon = require("sinon");
// global.chai = require("chai");
// global.chai.use(require("chai-spies"));
// global.chai.use(require("sinon-chai"));
// global.assert = global.chai.assert;
// global.expect = global.chai.expect;
// global.should = global.chai.should();

// gather test files
// var filePatterns = _([
// 	"test/**/*test.js"
// ]);
// console.log(glob("test/**/*test.js"));
// var testFiles = filePatterns.map(function(pattern) {
// 	var files = glob(pattern);
// 	console.log(files);
// 	return files;
// });

 //.flatten();

function runTests() {
	var mocha = new Mocha();
	mocha.reporter("spec").ui("bdd");
	var testFiles = glob("test/**/*test.js");
	console.log(testFiles);
	mocha.suite.on("pre-require", function(context, file) {
		uncache(file);
	});

	testFiles.forEach(function(file) {
		mocha.addFile(file);
	});

	mocha.run();
}

runTests();

chokidar.watch(["./app", "./test"], {ignored: /[\/\\]\./}).on('all', function(event, path) {
	if (event === "change") {
		console.log(event, path);
		runTests();
	}
});

