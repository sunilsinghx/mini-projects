import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import quizRoutes from "./routes/quiz.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/quiz",quizRoutes)
const PORT =process.env.PORT || 8001
app.listen( PORT,()=>console.log("server started...."))
