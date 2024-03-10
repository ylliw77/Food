console.clear();

// DOTENV

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT || 3000;

// EXPRESS

const express = require("express");
const app = express();
const cors = require('cors');
const {nanoid} = require('nanoid/non-secure');

// ROUTER

const routeUser = require("./routers/user-router");
const routeContent = require("./routers/content_router");
const errorHandler = require("./helpers/error-handler");
const publicRouter = require("./routers/public_router");

// BODY PARSER

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Transit

app.use(cors())

// MAIN APP

console.log("jebew" + nanoid());

app.use(publicRouter);
app.use(routeUser);
app.use(routeContent);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`This App is running on port ${PORT}`);
});

// module.exports = app
