const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const indexRouter = require("./routes/indexRouter");
dotenv.config();

const app = express();

app.use(express.json());
app.use("/", indexRouter);

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`the server is listening on http://localhost:${PORT}/`);
  });
});
