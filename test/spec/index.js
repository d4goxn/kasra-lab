// Delete the `BROWSER` env variable if it's present
// https://github.com/iam4x/isomorphic-flux-boilerplate/issues/16
delete process.env.BROWSER;

// Tell `require` calls to look into `/app` also
// it will avoid `../../../../../` require strings
process.env.NODE_PATH = "app";
require("module").Module._initPaths();

require("babel/register");

// require("../utils/init-dom").run();