import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"





/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description expects data and register a user 
 */


const registerUser = asyncHandler(async (req, res) => {
    //  register a user
    // take username, email and password 
    // check if user have entered it correctly
    // check if a user with this email or username already exist or not 
    // if yes then throw error and if not then create and save the user in db 

    const { username, email, password } = req.body
    if ([username, email, password].some(element => !element || element?.trim() === "")) {
        throw new ApiError(400, 'provide email, username and password')
    }

    //validate email
    if (!email.includes("@")) {
        throw new ApiError(400, "Invalid email")
    }


    // finding existing user
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        let errorMessage = (existingUser?.username === username) ? "A user with this username already exist" : (existingUser?.email === email) ? "A User with this email already exist" : "This user already exist "
        throw new ApiError(400, errorMessage)
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )

    const options = {
        httpOnly: true
    }

    res
        .status(201)
        .cookie("token", token, options)
        .json(new ApiResponse(
            "User created successfully",
            201,
            {
                id: user._id,
                username,
                email
            }
        ))
    //  res.cookie tell Express to send a Set-Cookie header in the HTTP response, now browser receives that response and store the cookies in the browser. 
})

/**
 *  @param {*} req 
 * @param {*} res 
 * @description expects  email and password and then login a user 
 */
const loginUser = asyncHandler(async (req, res) => {
    //  take imput(email and password) from req.body
    // validate the input 
    // find if user with this email exist or not, if not throw error 
    // if user exist then validate password 
    // if password is correct then login the user 
    const { email, password } = req.body

    if ([email, password].some(field => !field || field?.trim() === "")) {
        throw new ApiError(400, "all field are required");
    }
    if (!email.includes("@")) {
        throw new ApiError(400, "Invalid Email");
    }

    const user = await User.findOne({ email }, { email: 1, password: 1 });

    if (!user) {
        throw new ApiError(404, "This User does not exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid User credentials")
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }

    )

    const options = {
        httpOnly: true
    }

    res
        .status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(
            "user logged in successfully",
            200,
            {
                id: user._id,
                username: user.username,
                email: user.email,

            }

        ))
})


export { registerUser, loginUser }
