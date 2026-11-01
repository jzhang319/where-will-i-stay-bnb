// Sequelize loads the postgres dialect (and the `pg` driver it needs) with a
// dynamic require based on config, which Vercel's static dependency tracer
// can't see. Require it explicitly, via require.resolve, so it gets bundled
// into the function. NOTE: require.resolve's `paths` option is itself NOT
// statically traceable (confirmed empirically -- `pg` was missing from the
// built function and it reproduced the runtime "install pg manually" error),
// so a literal path string is used instead, which the tracer can follow.
require(require.resolve("../backend/node_modules/pg"));

module.exports = require("../backend/app");
