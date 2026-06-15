import express from "express"


const app = express();

app.use(express.json()) // this will make data available in req.body 


// routes
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter)




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