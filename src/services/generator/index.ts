import randomString from "randomstring";

import { randomGeneratorParameter } from "../../config";

/**
 * @description => code will generate a unique users id with first character 
 * users firstname & second character will be lastname first character
 * 
 * @param {Object} userObj 
 */
export const inviteFriendUidGenerator = (userObj?:any)=>{
    if (!userObj) return `JAIN_${randomString.generate(randomGeneratorParameter)}`;
    return `${userObj.firstName.slice(0,1)+userObj.lastName.slice(0,10)}_${randomString.generate(randomGeneratorParameter)}`;
}

/**
 * @description => generate unqiue code for the FILE with  
 * FILE_ then unqiue id generated by randomstring
 */
export const fileUidGenerator = ()=>`FILE_${randomString.generate(randomGeneratorParameter)}`;

/**
 * @description => generate unqiue code for the cookie with  
 * COOKIE_ then unqiue id generated by randomstring
 */
export const cookieUidGenerator = ()=> `COOKIE_${randomString.generate(randomGeneratorParameter)}`;
