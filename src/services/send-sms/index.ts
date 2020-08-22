import axios  from "axios";
import formData from "form-data";

import { hereIsError } from "../index";

/**
 * @description => send sms through LocalText sms
 *  apis
 * 
 * @param mobileNo 
 * @param msg 
 */
export const sendSMS = async (mobileNo:string, message:string) =>{
    try{
        if (!mobileNo || !message) throw "DATA IS MISSING";

        let data = new formData();
        data.append("apikey", process.env.TEXTLOCAL_APIKEY || "");
        data.append("sender", process.env.TEXTLOCAL_SENDER || "");
        data.append("numbers", mobileNo);
        data.append("message", message);

        let axiosData:any = {
            method: 'post',
            url: 'https://api.textlocal.in/send/',
            headers: {
                ...data.getHeaders()
            },
            data 
        };

        let response = await axios(axiosData); 
        return response.data;
    }catch(error){
        hereIsError(error, "sendSMS");
    }
}

/**
 * @description => generate msg for OTP & send it to
 * mobile no specify by the user
 * 
 * @param mobileNo 
 * @param otp 
 */
export const sendOTPSMS = async (mobileNo:string, otp:string)=>{
    try{
        const message = `<#>${otp} is your One Time Password to login in Jinvani App.\nJai Jinder\nTeam Jinvani App\n`;
        //let res = await sendSMS(mobileNo,message);
        //console.log(res);
        return {msg:"OK"};
    }catch(error){
        hereIsError(error, "sendOTPSMS");
    }
}
