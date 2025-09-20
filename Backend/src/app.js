import express from 'express'
import userRouter from './routes/user.routes.js'
import promptRouter from './routes/prompt.routes.js'
import communityRouter from './routes/communityPrompt.route.js'
import exportRouter from './routes/export.route.js'
import aiRouter from './routes/ai.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/user",userRouter)
app.use("/api/prompt",promptRouter)
app.use("/api/community",communityRouter)
app.use("/api/export",exportRouter)
app.use("/api/ai",aiRouter)


export default app