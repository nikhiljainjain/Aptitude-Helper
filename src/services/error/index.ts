import { Response } from "express";

import { PRODUCTION_ENV, invalidRes } from "../../config";
import Error from "../../database/model/error";

/**
 * @description => display error with location
 * 
 * @param theError 
 * @param errorLocation 
 * @param res 
 */
export const hereIsError = async (theError:any, 
    errorLocation:string, res?:Response) =>{
    
    //printing the error with location
    console.error("OOPS!!! at ", errorLocation, "\n", theError);
    
    //response if present
    if(res){
        res.locals = invalidRes;

        //saving error in db for later use & resolvement
        if (PRODUCTION_ENV){
            await Error.create({ 
                location: errorLocation,
                error: theError
            });
        }

        //error will thorugh in response if not in production mode
        res.locals.data = !PRODUCTION_ENV ? theError:(typeof(theError) == "string" ? 
            theError : "OOPS!!!");
        return res.status(theError.status || 503).json(res.locals);
    }
}
