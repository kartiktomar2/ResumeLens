import mongoose from 'mongoose';


const blacklistTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "token is required to be added in the list "]
        }
    },
    {
        timestamps: true
    }

)


export const BlacklistToken= mongoose.model("BlacklistToken", blacklistTokenSchema);


