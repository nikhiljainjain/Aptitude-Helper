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
        const { ip, originalUrl, headers } = req;

        const newLocationJSON = await findIPData(ip);
        const ipAddress = filterIPAddress(ip);
        const newLocation = JSON.stringify(newLocationJSON);
    
        try{
            const userLogData = new UserLog({
                registerIPAddress: ipAddress,
                newLocation,
                originalUrl,
                userAgent: headers["user-agent"]
            });

            await userLogData.save();
        }catch(error){
            if (error.code === 11000){
                return;
            }else{
                throw error;
            }
        }       
    }catch(error){
        hereIsError(error, req.originalUrl);
    }
}
