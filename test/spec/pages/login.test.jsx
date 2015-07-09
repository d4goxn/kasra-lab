import chai from "chai";

import React from "react/addons";

import shallowRenderComponent from "../../utils/shallow-render-component";

// import objectAssign from "react/lib/Object.assign";

// import Footer from "components/shared/footer";
// import Post from "components/post";

// import Navbar from "components/shared/navbar";

// import reactRouterStub from "../../utils/stub-router-context";

// import LoginStoreMock from "../../utils/login-store-mock";

const TestUtils = React.addons.TestUtils;
const should = chai.should();

// function createComponent(component, props, ...children) {
// 	const shallowRenderer = TestUtils.createRenderer();
// 	shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
// 	return shallowRenderer.getRenderOutput();
// }

describe("Login", () => {

	// let node;

	// let instance;

	// let flux;

	var instance;

	// let footer;

	// let navbar;

	// const shallowRenderer = TestUtils.createRenderer();

	beforeEach(() => {
		const	loginStoreMock = require("../../utils/login-store-mock");
		const loginInjector = require("inject!components/login");
		const Login = loginInjector({
			"stores/login-store": loginStoreMock
		});
		instance = shallowRenderComponent(Login);

		// instance = createComponent(Post, { title: "Title", content: "<p>Content</p>"});

		// var loginTestInjector = require("inject!components/login-test");
		// var LoginTest = loginTestInjector({
		// 	"stores/login-store": LoginStoreMock
		// });

		// var rewire = require("rewire");
		// var LoginTest = rewire("components/login-test");
		// LoginTest.__set__("LoginStore", LoginStoreMock);
		// login = createComponent(LoginTest);
		// footer = createComponent(Footer);

		// navbar = createComponent(Navbar);
	});

	it("should test mocking injector", function() {
		var foobarMock = require("components/foobar-mock");
		var fooInjector = require("inject!components/foo");
		var foo = fooInjector({
			"./foobar": foobarMock
		});
		var result = foo();
		result.should.equal("MOCK");
	});

	it("should login", function() {
		should.exist(instance);
	});

	// it("should render a post title and content", function() {
	// 	const postTitle = instance.props.children[0];
	// 	const postContent = instance.props.children[1];
	// 	postTitle.props.children.should.equal("Titlez");
	// 	postContent.props.children.should.equal("Contentz");
	// });

	// it("should render login correctly", () => {
	// 	console.log(login);
	// 	should.exist(login);

	// 	// const title = TestUtils.findRenderedDOMComponentWithTag(instance, "h1");
	// 	// title.getDOMNode().textContent.should.eql(messages.users.title);
	// });

	// it("should render footer correctly", () => {
	// 	console.log(footer);
	// 	should.exist(footer);

	// 	// const title = TestUtils.findRenderedDOMComponentWithTag(instance, "h1");
	// 	// title.getDOMNode().textContent.should.eql(messages.users.title);
	// });

	// it("should render navbar correctly", () => {
	// 	console.log(navbar);
	// 	should.exist(navbar);

	// 	// const title = TestUtils.findRenderedDOMComponentWithTag(instance, "h1");
	// 	// title.getDOMNode().textContent.should.eql(messages.users.title);
	// });





	// it("should render without users", () => {
	// 	// Check `state.users` is empty
	// 	instance.state.users.should.be.empty;
	// 	// Check `<li></li>` don"t exists
	// 	const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, "user--row");
	// 	td.should.be.empty;
	// });

	// it("should render 10 users after first fetch", (done) => {
	// 	const handleChange = () => {
	// 		const td = TestUtils.scryRenderedDOMComponentsWithClass(instance, "user--row");
	// 		td.length.should.eql(10);
	// 		flux.getStore("users").unlisten(handleChange);
	// 		return done();
	// 	};
	// 	flux.getStore("users").listen(handleChange);
	// });

	// it("should add an user after click on add button", (done) => {
	// 	const handleFetchChange = () => {
	// 		// 10 users after fetch
	// 		let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, "user--row");
	// 		td.length.should.eql(10);

	// 		// clean
	// 		flux.getStore("users").unlisten(handleFetchChange);

	// 		// add an user
	// 		flux.getStore("users").listen(handleAddChange);
	// 		const addButton = instance.refs["add-button"];
	// 		should.exist(addButton);

	// 		setTimeout(() => {
	// 			TestUtils.Simulate.click(addButton);
	// 		}, 0);
	// 	};

	// 	const handleAddChange = () => {
	// 		// 11 users after add
	// 		let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, "user--row");
	// 		td.length.should.eql(11);

	// 		// clean
	// 		flux.getStore("users").unlisten(handleAddChange);
	// 		return done();
	// 	};

	// 	flux.getStore("users").listen(handleFetchChange);
	// });

	// it("should remove an user", (done) => {
	// 	const handleChange = () => {
	// 		// 10 users after fetch
	// 		let td = TestUtils.scryRenderedDOMComponentsWithClass(instance, "user--row");
	// 		td.length.should.eql(10);

	// 		// remove an user
	// 		const removeButton = TestUtils.scryRenderedDOMComponentsWithClass(instance, "user--remove")[0];
	// 		should.exist(removeButton);

	// 		// wait for dispatch to be done before
	// 		// calling another action
	// 		setTimeout(() => {
	// 			TestUtils.Simulate.click(removeButton);

	// 			// it should have 9 users
	// 			td = TestUtils.scryRenderedDOMComponentsWithClass(instance, "user--row");
	// 			td.length.should.eql(9);

	// 			// clean
	// 			flux.getStore("users").unlisten(handleChange);
	// 			return done();
	// 		}, 0);
	// 	};
	// 	flux.getStore("users").listen(handleChange);
	// });

});
