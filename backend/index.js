const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index.route");
const dotenv = require("dotenv");
const connectToDatabase = require("./db/connect");
const port = process.env.PORT || 3000;

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocs = YAML.load("./swagger.yaml");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(router);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

connectToDatabase();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
