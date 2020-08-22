import { Request, Response } from "express";

import { hereIsError, findIPData } from "../index";
import UserLog from "../../database/model/users-log";

/**
 * @description => saving the ip address & location 
 * of new ip address of user
 * 
 * @param req 
 * @param res 
 */
export const saveUserChangedIP = async (req:Request, res: Response) =>{
    try{
        const { ipAddress } = res.locals;
        const { ip, originalUrl } = req;

        const newLocation = await findIPData(ip);
        
        const userLogData = new UserLog({
            registerIPAddress: ipAddress,
            newIPAddress: ip,
            newLocation,
            originalUrl
        });

        await userLogData.save();
    }catch(error){
        hereIsError(error, req.originalUrl, res);
    }
}
