import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import linkedInRouter from "./router/linkedin.router.js"
import { config } from "dotenv"


config();

const app = express();

app.use(cookieParser())
app.use(cors({
  methods: ["GET", "POST"],
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))



app.use("/linkedin", linkedInRouter)

// The cookie may not be set due to:
// 1. CORS restrictions - make sure your frontend domain is included in CORS origins
// 2. Missing cookie options like SameSite, Secure, etc.
// Here's the modified code with cookie options:
app.get("/", (req, res) => {
  res.cookie("something", "working", {
    sameSite: "none",
    secure: true
  })
  res.status(200).json({
    success: true
  })
})


const PORT = process.env.PORT || 5500

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
