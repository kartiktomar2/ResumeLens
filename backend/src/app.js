import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cors({
      origin: "http://localhost:5173",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true

}))
app.use(express.json()) // this will make data available in req.body 
app.use(cookieParser())




// routes
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";


app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



const isProd = process.env.NODE_ENV === 'production';
app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err?.statusCode || 500;
    const payload = {
        message: err?.message || 'Internal Server Error',
        success: err?.success ?? false,
        name: err?.name || 'Error'
    };
    if (!isProd) {
        payload.stack = err?.stack;
        payload.error = err?.error;
    }
    res.status(statusCode).json(payload);
});
export { app }