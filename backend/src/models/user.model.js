import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
        // refer chat: Unique Syntax in Mongoose(starting 3 prompts) for more detailed understanding 
        // tells Mongoose:
        // "Create a unique index in MongoDB for this field."
        // It is actually an index option, not a validation option.
        // A validator runs in Mongoose before data is sent to MongoDB, but unique is not a validator 
        //for unique,  Mongoose does not check whether the username already exists.It simply asks MongoDB to create a unique index. Later, when you insert data, MongoDB performs the duplicate check.

    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    }


}, { timestamps: true })


userSchema.pre("save",async function(){   // in pre save hook when we use async function then mongoose does not pass next as a parameter 
       if(!this.isModified("password"))
       {
        return ;
       }
       this.password=await bcrypt.hash(this.password,10)
       
})

//adding methods to check whether the user has entered the correct password or not, this method is for already registered user and will be used in login route

userSchema.methods.isPasswordCorrect=async function(password){
    return  await bcrypt.compare(password,this.password)
}
//Explanation for the isPasswordCorrect method:
// Whenever I will do await user.isPasswordCorrect. then this await is on the promise returned by the async function and inside the async function the line return await bcrypt.compare(password,this.password) here bcrypt.compare() creates a promise and since await is written before it so this function will only return when this promsie get resolved. and we know that the promise returned by the async function always gets resolved with the value that function is returning so there when the line return await bcrypt.compare(password,this.password) return true or false then await user.isPasswordCorrect() get resolved with the returned value

export  const User= mongoose.model("User", userSchema);