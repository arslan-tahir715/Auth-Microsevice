import express from "express";
const passport = require('passport');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const PassportInitialize = require("./passport-config")
const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

PassportInitialize(passport);

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
db.sequelize.sync();

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Duro." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});