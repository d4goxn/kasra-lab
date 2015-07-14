import chai from "chai";
import sinon from "sinon";

import React from "react/addons";

import shallowRenderComponent from "../../utils/shallow-render-component";
import initDom from "../../utils/init-dom";

import getWrappedComponent from "../../utils/get-wrapped-component";

import mockery from "mockery";
import nock from "nock";
import axios from "axios";
import sinonChai from "sinon-chai";
// import {defer} from "lodash";
// import LoginStore from "stores/login-store";

const TestUtils = React.addons.TestUtils;
const should = chai.should();
// const expect = chai.expect();
chai.use(sinonChai);


const mockLogin = {
	username: "foo",
	password: "bar"
};

const mockUserResponse = {token: 123};

describe("Login", () => {
	// initDom.run();
	if (!axios.get.calledWith) {
		sinon.spy(axios, "get");
		sinon.spy(axios, "put");
		sinon.spy(axios, "post");
		sinon.spy(axios, "delete");
	}

	var instance;
	var element;
	var component;

	beforeEach(() => {
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false

			// useCleanCache: true
		});
		nock.disableNetConnect();

		const	routerMock = require("../../utils/router-mock");
		mockery.registerMock("router", routerMock);

		// mockery.registerMock("stores/login-store", loginStoreMock);

		const Login = require("components/login");
		component = React.render(<Login/>, document.body);
		instance = getWrappedComponent(component);
		element = document.body.children[0];
		// instance = getWrappedComponent(component);
		// var inputs = instance.getElementsByTagName('input');
		// console.log(inputs);
		// instance = getWrappedComponent(TestUtils.renderIntoDocument(<Login/>));
		initDom.stashWindow();
		initDom.fakeLocalStorage();


	});

	afterEach(() => {
		mockery.disable();
		initDom.restoreWindow();
		nock.enableNetConnect();
		React.unmountComponentAtNode(document.body);
	});

	it("should have input fields", function() {
		const fields = TestUtils.scryRenderedDOMComponentsWithTag(instance, "input");
		fields.length.should.eq(2);
	});

	describe("success login", () => {
		beforeEach(() => {
			nock("http://localhost:80")
				.post("/auth/login")
				.reply(200, mockUserResponse);
			instance.setState({
				login: mockLogin
			});
			instance.login();
		});

		it("should call login", function() {
			axios.post.getCall(0).args[0].should.eq("/auth/login");
			axios.post.getCall(0).args[1].should.deep.eq(mockLogin);
			// should.exist(instance.props.user);
			// should.not.exist(instance.props.error);

		});
	});
});

