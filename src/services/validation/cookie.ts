//installed packages
import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
import validator  from "validator";

//files created
import User from "../../database/model/user";
import { invalidRes, COOKIES_AGE } from "../../config";
import { getRedis, insertRedis } from "../index";
import { hereIsError } from "../error";
import Admin from "../../database/model/admin";
import { setCookieAndHeaderSend } from "../response";
import { expireRedis } from "../redis";
import { saveUserChangedIP, saveAdminChangedIP } from "../ip-address/save-ip";

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
	let cookie:any = req.headers["x-auth-token"]; 
	cookie = cookie ? cookie.split(",")[0]:null;
	
	//cookies are invalid & access able to only valid user cookie
	if (!cookie || !validator.isJWT(cookie))
	  	return res.status(403).set("x-auth-token", "").json(res.locals);
	
	//try catch defined for jwt error  if something wrong happened with jwt
    try {
		//token validation from jwt
		const { mobileNo, ipAddress }:any = jsonwebtoken.verify(cookie, jwtSecret);

		//checking cookie value in db
		const dataInRedis = await getRedis(mobileNo);
		const userData = dataInRedis ? dataInRedis:(await User.findOne({ mobileNo }));

		//cookies are invalid & access able to only valid user cookie
		if (!userData) 
			return res.status(403).set("x-auth-token", "").json(invalidRes);
		
		//saving the data locally for various purpose
		res.locals = { mobileNo, ipAddress, ...userData };

		//if request is not from ip address then save the data
		if (ipAddress != req.ip) await saveUserChangedIP(req, res);

		//setting user data to request so it can use further no need of user fetch
		(!dataInRedis) ? insertRedis(cookie, userData, COOKIES_AGE):null;
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

/**
 * @description => admin cookie validation function
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const adminCookieValid =  async (req: Request, res: Response, next:Function) => {
	res.locals = invalidRes;
	res.locals.data = "LOGIN AGAIN";

	//extracting cookies from req parameter
	let cookie:any = req.headers["x-auth-token"]; 
	cookie = cookie ? cookie.split(",")[0]:null;
	
	//cookies are invalid & access able to only valid user cookie
	if (!cookie || !validator.isJWT(cookie))
	  	return res.status(403).set("x-auth-token", "").json(res.locals);
	
	//try catch defined for jwt error  if something wrong happened with jwt
    try {
		//token validation from jwt
		const { token, ipAddress }:any = jsonwebtoken.verify(cookie, jwtSecret);
		cookie = token;

		//checking cookie value in db
		const dataInRedis = await getRedis(cookie);
		const adminData = dataInRedis ? dataInRedis:await Admin.findOne({ cookie });

		//cookies are invalid & access able to only valid user cookie
		if (!adminData) return res.status(403).set("x-auth-token", "").json(invalidRes);
	
		//saving data local on response
		res.locals = { token, ipAddress, ...adminData, cookie };

		//logoout the user if the ipaddresss is not same as in cookie
		if (ipAddress != req.ip){
			await saveAdminChangedIP(req, res);
			await Admin.updateOne({ cookie }, { $set:{cookie:null}});
			expireRedis(cookie, 1);
			return setCookieAndHeaderSend("", res, res.locals);
		}

		//setting user data to request so it can use further no need of user fetch
		(!dataInRedis) ? insertRedis(cookie, adminData, COOKIES_AGE):null;
		next();	
    }catch (error) {
        hereIsError(error, "cookieValid", res);
    }
}
