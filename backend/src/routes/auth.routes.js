import express from "express"
import { currentUser, loginUser, logoutUser, registerUser } from "../controller/auth.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"


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


/**
 * @route POST /api/auth/logout
 * @description remove token from cookies and add token to blacklist 
 */
authRouter.route("/logout").post(verifyJWT, logoutUser)


/**
 * @route GET /api/auth/current-user
 * @description get the current logged-in user
 */
authRouter.route("/current-user").get(verifyJWT, currentUser)


export default authRouter