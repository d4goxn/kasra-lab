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

describe("Login", () => {
	var instance;

	beforeEach(() => {
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		const	routerMock = require("../../utils/router-mock");
		mockery.registerMock("router", routerMock);

		const Login = require("components/login");
		instance = shallowRenderComponent(Login);
	});

	afterEach(() => {
		mockery.disable();
	});

	it("should have input fields", function() {
		console.log(instance);
		// const fields = TestUtils.scryRenderedDOMComponentsWithTag(instance, "input");
		// fields.length.should.eq(2);
	});
});

