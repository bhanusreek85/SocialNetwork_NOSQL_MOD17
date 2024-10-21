import {Schema, model,Types} from "mongoose";

const reactionSchema = new Schema ({
    reactionId:{
        type: Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    },
    userName:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    },

},{

    toJSON: {
        getters: true
    }
});
// const reaction = model("reaction", reactionSchema);

export default reactionSchema;