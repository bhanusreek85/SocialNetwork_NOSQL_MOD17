import {Schema,Types} from "mongoose";
import moment from "moment";

const reactionSchema = new Schema ({
    reactionId:{
        type: Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required:true,
        min:1,
        max:280
    },
    userName:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do, YYYY [at] h:mm a')
    },

},{

    toJSON: {
        getters: true
    }
});

export default reactionSchema;