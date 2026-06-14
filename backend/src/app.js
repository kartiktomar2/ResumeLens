import express from "express"


const app= express();

app.use(express.json()) // this will make data available in req.body 


// routes
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth",authRouter)

export {app}