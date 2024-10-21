import {Schema, model} from "mongoose";
import reactionSchema  from "./reaction.js";
import moment from "moment";

const thoughtsSchema = new Schema ({
    thoughtText:{
        type:String,
        required:true,
        minlength: 1,
        maxlength: 280
        

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do, YYYY [at] h:mm a')
    },
    userName:{
        type:String,
        required:true
    },
    reactions:[reactionSchema]

},{

    toJSON: {
        getters: true
    }
});
const thought = model("thought", thoughtsSchema);

export default thought;