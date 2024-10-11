const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const subjectRoutes = require("./routes/subjectRoute.js");
const questionRoute = require("./routes/questionRoute.js");
const startExamRoute = require("./routes/startExamRoute.js");
const answerRoutes= require("./routes/answerRoute.js");
const resultRoutes = require('./routes/resultRoute.js')

dotenv.config();
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// auth routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/start-exam", startExamRoute);
app.use('/api/v1/answer', answerRoutes);
app.use('/api/v1/result', resultRoutes);

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "welcome to online shopee",
  });
});

app.listen(process.env.PORT, () => {
  console.log("app is running");
});
