import express from 'express'
import userRouter from './routes/user.routes.js'
import promptRouter from './routes/prompt.routes.js'
import communityRouter from './routes/communityPrompt.route.js'
import exportRouter from './routes/export.route.js'
import aiRouter from './routes/ai.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { fileURLToPath } from "url";

// __dirname, __filename ko ES Module me manually banana padta hai
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user",userRouter)
app.use("/api/prompt",promptRouter)
app.use("/api/community",communityRouter)
app.use("/api/export",exportRouter)
app.use("/api/ai",aiRouter)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


export default app