const sharedComponentGenerator = require('./generators/shared_component/index');

module.exports = function (plop) {
  plop.setGenerator('shared component', sharedComponentGenerator);
};