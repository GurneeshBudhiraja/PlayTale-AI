import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import linkedInRouter from "./router/linkedin.router.js"
import linkedInJobsRouter from "./router/linkedInJobs.router.js"
import { config } from "dotenv"
import connectDb from "./db.js";


config();

const app = express();

connectDb()

app.use(cookieParser());
app.use(cors({
  methods: ["GET", "POST"],
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.urlencoded({
  extended: true,
}));


app.use(express.json());




app.use("/linkedin", linkedInRouter)
app.use("/linkedin-job", linkedInJobsRouter)


const PORT = process.env.PORT || 5500

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
