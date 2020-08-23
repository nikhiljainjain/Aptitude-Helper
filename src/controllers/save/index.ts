import { Request, Response } from "express";

import { hereIsError, saveUserChangedIP, cookieUidGenerator, jwtGenerateToken, setCookie, filterIPAddress } from "../../services";
import { validRes } from "../../config";
import UsesLogs from "../../database/model/uses";

export class SaveController{
    public async ipAddress(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) {
        try{
            if (req.cookies["x-auth-token"]) return res.json(validRes);

            await saveUserChangedIP(req,res);
            
            res.locals = validRes;
            res.locals.data = "DONE";

            let cookies = {
                token: "",
                jwt: "",
                ipAddress: ""
            };

            cookies.ipAddress = filterIPAddress(req.ip) || "";
            cookies.token = cookieUidGenerator();
            cookies.jwt = jwtGenerateToken(cookies);

            return setCookie(cookies.jwt, res, res.locals);
        }catch(error){
            hereIsError(error, req.originalUrl, res);
        }
    }
    
    public async functionUsesCount(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) {
        try{
            const { _id, ipAddress } = res.locals;
            const { strConvert } = req.body;

            let usesLogData:any = await UsesLogs.findOne({ userLogID: _id });

            if (!usesLogData){
                usesLogData = new UsesLogs({
                    userLogID: _id,
                    ipAddress
                });
            }

            let newData = {
                time: (Date.now()),
                strConvert
            }

            usesLogData.uses.push(newData);

            await usesLogData.save();

            res.locals = validRes;
            res.locals.data = "DONE";

            return res.json(res.locals);
        }catch(error){
            hereIsError(error, req.originalUrl, res);
        }
    }
}
