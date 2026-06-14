import express from "express"
import { registerUser } from "../controller/auth.controller.js"


const authRouter= express.Router()


/** 
 * @route POST /api/auth/register 
 * @description register a new user 
 */
authRouter.route("/register").post(registerUser)



export default authRouter