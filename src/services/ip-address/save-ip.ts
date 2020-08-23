import { Request, Response } from "express";

import { hereIsError, findIPData } from "../index";
import UserLog from "../../database/model/users-log";
import { filterIPAddress } from ".";

/**
 * @description => saving the ip address & location 
 * of new ip address of user
 * 
 * @param req 
 * @param res 
 */
export const saveUserChangedIP = async (req:Request, res: Response) =>{
    try{
        const { ip, originalUrl } = req;

        const newLocation = await findIPData(ip);
        const ipAddress = filterIPAddress(ip);
        
        const userLogData = new UserLog({
            registerIPAddress: ipAddress,
            newLocation,
            originalUrl
        });

        await userLogData.save();       
    }catch(error){
        hereIsError(error, req.originalUrl);
    }
}
