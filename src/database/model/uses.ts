// Schema for details about the user
import * as mongoose from "mongoose";
import { schemaName } from "../../config";

let usesLogSchema = new mongoose.Schema({
    userLogID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: schemaName.usersLog,
        default: null,
        trim: true,
        unique: true
    },
    //original ip adress from which user have logged in
    ipAddress:{
        type: String,
        default: null,
        lowercase: true,
        trim: true,
        unique: true
    },
    //uses by user
    uses:[{
        time: {
            type: Date,
            default: (Date.now())
        },
        strConvert: {
            type: Array,
            defautl: []
        }
    }],
},
//time when user was registered to our platform
{
    timestamps: true,
});

const UsesLogs = mongoose.model(schemaName.usesLogs, usesLogSchema);
export default UsesLogs;
