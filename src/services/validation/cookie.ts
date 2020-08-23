//installed packages
import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
import validator  from "validator";

//files created
import UserLog from "../../database/model/users-log";
import { invalidRes, COOKIES_AGE } from "../../config";
import { hereIsError } from "../error";
import { setCookieAndHeaderSend, setCookie } from "../response";

const jwtSecret = process.env.JWT_SECRET || "SECRET";

/**
 * @description => user cookie validation function
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const cookieValid = async (req: Request, res: Response, next:Function) => {
    res.locals = invalidRes;
	res.locals.data = "LOGIN AGAIN";

	//extracting cookies from req parameter
	let cookie:any = req.cookies || req.headers["x-auth-token"]; 
	cookie = cookie ? cookie.split(",")[0]:null;
	
	//cookies are invalid & access able to only valid user cookie
	if (!cookie || !validator.isJWT(cookie))
	  	return setCookie("", res, req);
	
	//try catch defined for jwt error  if something wrong happened with jwt
    try {
		//token validation from jwt
		const { token, ipAddress }:any = jsonwebtoken.verify(cookie, jwtSecret);

		//checking cookie value in db
		const userData = await UserLog.findOne({ ipAddress });
		
		//saving the data locally for various purpose
		res.locals = { ipAddress, ...userData };

		next();	
    }catch (error) {
        hereIsError(error, "cookieValid", res);
    }
};

/**
 * A function to generate the login token for custom logins
 * @param {*} payload
 * @returns {string} JWT
 */
export const jwtGenerateToken =  (payload:Object, time?:number): string => {
	const jwtToken = jsonwebtoken.sign(payload, jwtSecret, {
		expiresIn: (!time ? COOKIES_AGE:time),
	});
	return jwtToken;
};
