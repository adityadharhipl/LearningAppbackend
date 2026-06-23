const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("src/swagger/swagger.yaml");

module.exports = {
  swaggerUi,
  swaggerDocument,
};