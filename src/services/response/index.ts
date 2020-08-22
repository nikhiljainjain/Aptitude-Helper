import { Response } from "express";
import { COOKIE_PROP } from "../../config";

/**
 * @description => set header & send the response back to the client
 * 
 * @param headerValue 
 * @param res 
 * @param reply 
 * @param headerKey 
 */
export const setHeaderSend = (headerValue:string, res: Response, reply: any, headerKey?:string) =>{
    return res.set(headerKey ? headerKey:"x-auth-token", headerValue).json(reply);
}

/**
 * @description => set cookie & send the response back to the client
 * 
 * @param cookieValue 
 * @param res 
 * @param reply 
 * @param cookieKey 
 */
export const setCookie = (cookieValue:string, res: Response, reply: any, cookieKey?:string) =>{
    return res.cookie(cookieKey ? cookieKey:"x-auth-token", cookieValue, COOKIE_PROP).json(reply);
}

/**
 * @description => set cookie & header for the client 
 * send the response back to the client
 * 
 * @param value 
 * @param res 
 * @param reply 
 * @param key 
 */
export const setCookieAndHeaderSend = (value:string, res:Response, reply:any, key?:string)=>{
    return res.cookie(key ? key:"x-auth-token",value, COOKIE_PROP)
    .set(key ? key:"x-auth-token", value).json(reply);
}
