//regex for testing indian mobile no
let mobileNumRegExp = new RegExp("^[6-9][0-9]{9}$");

/**
 * @description -> validating Indian mobile number format 
 * @param {*} mobileNo 
 */
export const validIndianMobileNumber = (mobileNo:string) => {
    return (mobileNumRegExp.test(mobileNo));
}
