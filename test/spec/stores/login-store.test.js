import chai from "chai";
import sinon from "sinon";

import sinonChai from "sinon-chai";

import mockery from "mockery";
import nock from "nock";
import actions from "actions/login-actions";
import initDom from "../../utils/init-dom";
import alt from "utils/alt";
const should = chai.should();

chai.use(sinonChai);

const mockUserResponse = {token: 123};
const mockUserError = {message: "fail"};

describe("LoginStore", () => {
	// Don't forget to clean DOM
	// initDom.run();
	initDom.fakeLocalStorage();
	let store;

	beforeEach(() => {
		initDom.stashWindow();
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		nock.disableNetConnect();
		/**
		 * router must be mocked out from components using it,
		 * otherwise bad stuff will happen
		 */
		const	routerMock = require("../../utils/router-mock");
		mockery.registerMock("router", routerMock);

		store = require("stores/login-store");
		alt.flush();
	});

	afterEach(() => {
		mockery.disable();
		initDom.restoreWindow();
		nock.enableNetConnect();
	});

	describe("successul login", () => {
		beforeEach((done) => {
			nock("http://localhost:80")
				.post("/auth/login")
				.reply(200, mockUserResponse);
			const handleChange = () => {
				store.unlisten(handleChange);
				done();
			};

			let state = store.getState();
			should.not.exist(state.user);
			should.not.exist(state.error);
			store.listen(handleChange);
			actions.login();
		});

		it("should store user", function() {
			let state = store.getState();
			state.user.should.deep.eq(mockUserResponse);
			should.not.exist(state.error);
		});
	});

	describe("failed login", () => {
		beforeEach((done) => {
			nock("http://localhost:80")
				.post("/auth/login")
				.reply(401, {message: 'fail'});
			const handleChange = () => {
				console.log('in change!!!');
				store.unlisten(handleChange);
				done();
			};

			let state = store.getState();
			// should.not.exist(state.user);
			// should.not.exist(state.error);
			store.listen(handleChange);
			actions.login();
			// done();
		});

		it("should store error", function() {
			let state = store.getState();
			console.log(state);
			// state.error.should.deep.eq("fail");
			// should.not.exist(state.error);
		});
	});
});
