import {Schema, model} from "mongoose";

const userSchema = new Schema ({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:(email)=>{
            return /.+@.+\..+/.test(email);
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},
{
            toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
});

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
} )
const User = model("User", userSchema);

export default User;