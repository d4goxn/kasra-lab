import jsdom from "jsdom";
import sinon from "sinon";

module.exports = {
	run: function() {
		global.document = jsdom.jsdom();
		global.window = document.defaultView;
		global.navigator = sinon.spy();
	},

	stashWindow: function() {
		global._window = global.window;
		global.window = undefined;
	},

	restoreWindow: function() {
		global.window = global._window;
		global._window = undefined;
	},

	fakeLocalStorage: function() {
		global.localStorage = {
			getItem: sinon.spy(),
			setItem: sinon.spy(),
			removeItem: sinon.spy()
		};
	}
};
