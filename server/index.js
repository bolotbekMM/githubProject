require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const issuesRoutes = require("./routes/issue.routes");
const logRoutes = require("./routes/logs.routes");
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
app.use("/api", issuesRoutes);
app.use("/api", logRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () =>
      console.log(`server opened in http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};
start();
