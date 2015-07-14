// var router = {
// 	transitionTo: () => {return null; }
// };
// if (!process.env.TEST) {
// 	console.log("NOT IN TEST!!");
var Router = require("react-router");
var routes = require("routes");

var config = {routes};
if (process.env.BROWSER) {
	config.location = Router.HistoryLocation;
}
var router = Router.create(config);
console.log(router);

export default router;

// 	router = Router.create(config);
// }

// export default router;
