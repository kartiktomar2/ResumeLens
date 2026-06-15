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


userSchema.pre("save",async function(next){
       if(!this.isModified("password"))
       {
        return  next()
       }
       this.password=await bcrypt.hash(this.password,10)
       next()
})

//adding methods to check whether the user has entered the correct password or not 

export  const User= mongoose.model("User", userSchema);