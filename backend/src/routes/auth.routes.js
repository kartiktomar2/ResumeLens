import express from "express"
import { loginUser, registerUser } from "../controller/auth.controller.js"


const authRouter= express.Router()


/** 
 * @route POST /api/auth/register 
 * @description register a new user 
 */
authRouter.route("/register").post(registerUser)

/**
 * @route POST /api/auth/login
 * @description login a user 
 */
authRouter.route("/login").post(loginUser)

export default authRouter