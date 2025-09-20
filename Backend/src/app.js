import express from 'express'
import userRouter from './routes/user.routes.js'
import promptRouter from './routes/prompt.routes.js'
import communityRouter from './routes/communityPrompt.route.js'
import exportRouter from './routes/export.route.js'
import aiRouter from './routes/ai.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

app.use("/api/user",userRouter)
app.use("/api/prompt",promptRouter)
app.use("/api/community",communityRouter)
app.use("/api/export",exportRouter)
app.use("/api/ai",aiRouter)

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app