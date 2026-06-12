import express from "express"


const app= express();

app.use(express.json()) // this will make data available in req.body 





export {app}