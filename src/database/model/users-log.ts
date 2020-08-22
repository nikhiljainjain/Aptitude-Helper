// Schema for details about the user
import * as mongoose from "mongoose";
import { MONTH_TIME_IN_MSEC, schemaName } from "../../config";

let userLogSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: schemaName.users,
        default: null,
        select: false
    },
    //original ip adress from which user have logged in
    registerIPAddress:{
        type: String,
        default: null,
        lowercase: true,
        trim: true
    },
    //changed ip address received from the user
    newIPAddress:{
        type: String,
        default: null,
        lowercase: true,
        trim: true
    },
    //new location based on new ip address
    newLocation: {
        type: String,
        default: null,
        trim: true
    },
    //url request from the user
    originalURL:{
        type: String,
        default: null,
        trim: true
    },
    //data will delete after 6 month
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: (MONTH_TIME_IN_MSEC*6)
    }
},
//time when user was registered to our platform
{
    timestamps: true,
});

const UserLog = mongoose.model(schemaName.usersLog, userLogSchema);
export default UserLog;
