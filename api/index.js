// Sequelize loads the postgres dialect (and the `pg` driver it needs) with a
// dynamic require based on config, which Vercel's static dependency tracer
// can't see. Require it explicitly so it gets bundled into the function.
require("../backend/node_modules/pg");

module.exports = require("../backend/app");
