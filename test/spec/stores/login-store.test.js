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

describe("LoginStore", () => {

	let store;

	beforeEach(() => {
		initDom.stashWindow();
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false

			// useCleanCache: true
		});
		nock.disableNetConnect();
		nock("http://localhost:80")
				.post("/auth/login")
				.reply(200, mockUserResponse);

		const	routerMock = require("../../utils/router-mock");
		mockery.registerMock("router", routerMock);

		store = require("stores/login-store");
		alt.flush();
	});

	describe("successul login", () => {
		beforeEach((done) => {
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
});
