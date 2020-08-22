// Schema for details about the user
import * as mongoose from "mongoose";
import { schemaName } from "../../config";

let errorSchema = new mongoose.Schema({
    //url or function which produced the error
    location: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    //error produced by url or function
    error: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    //fixing method of this error
    fixingMethod: {
        type: String,
        default: null,
        trim: true
    }
},
//time when user was registered to our platform
{
    timestamps: true,
});

const Error = mongoose.model(schemaName.errorLog, errorSchema);
export default Error;
