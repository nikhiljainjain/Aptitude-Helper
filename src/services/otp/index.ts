import { calculateDays } from "../index";
import { hereIsError } from "../index";

/**
 * @description -> checking otp generated as per funtion defined in index file
 * @param {*} otp -> otp number
 */
export const validOTPNumber = (OTP:string) =>{
    return (!isNaN(Number(OTP)) && OTP.length === 6);
}

//otp creation function
export const otpGeneration = () => {
    return Math.floor(Math.random() * 899999 + 100000).toString();
};

/**
 * @description => checking if the otp received by the user is
 * valid or not
 *  
 * @param {*} otpData 
 * @param {*} otpReceived 
 * 
 * @param {*} it will return either false or otpDataObject based on user Schema
 */
export const verifyOTPNumber = async (otpData:any, otpReceived:string) =>{
    try{
        
        //checking invalid condition of a otp number
        if (!validOTPNumber(otpReceived) || otpData.number != otpReceived){
            return false;
        }else if (otpData.attempts > 3){
            return "Try Again After 24Hour";
        }else if (otpData.number == otpReceived){
            otpData.number = null;
            otpData.attempts = 0;
            otpData.lastAttempt = null;

            return otpData;
        }else return false;
    }catch(error){
        hereIsError(error, "verifyOTPNumber");
    }
};

/**
 * @description => checking if user not reached to its maxium 
 * limit of attempts of a day & if not then create new otp
 * 
 * @param {*} otpData 
 */
export const createOTPAgain = async(otpData:any) =>{
    try{
        //checking if user not reached to maximum attempts of a day
        if (!otpData || otpData.attempts > 3 ) return false;
        else{
            //otp generation
            otpData.number = otpGeneration();
            otpData.lastAttempt = Date.now();
            
            //to limit the number of user attempt
            otpData.attempts++;

            return otpData;
        }
    }catch(error){
        hereIsError(error, "createOTPAgain");
    }
}
