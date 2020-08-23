import axios from "axios";

import { hereIsError } from "../index";
import { ipv4RegExp, ipv6RegExp } from "../../config";

/**
 * @description => this function will filter ip address
 * from a string that is generated on heroku 
 * 
 * @param ip 
 */
export const filterIPAddress = (ip:string="24.48.0.1") =>{
    try{
        let ipList = ip.split(':');
        let regExpIPv4 = new RegExp(ipv4RegExp);
        let regExpIPv6 = new RegExp(ipv6RegExp);

        if (ipList.length === 0  && regExpIPv4.test(ipList[0]))
            return ip;
        else if (ipList.length === 4  && regExpIPv4.test(ipList[3]))    
            return ipList[3];
        else{
            ipList.pop();
            let ipAdd = ipList.toString().replace(",",":");
            return (regExpIPv6.test(ipAdd) ? ipAdd:"127.0.0.1");
        }

    }catch(error){
        hereIsError(error, "filterIPAddress");
    }
}

/**
 * @description => fetch the information about 
 * a particular ip address
 * 
 * @param ip 
 */
export const findIPData = async (ip:string="24.48.0.1") => {
    try {
        let ipAdd = filterIPAddress(ip);

        if (ipAdd === "127.0.0.1") return {};

        const [freegeoipRes, ipapiRes] = await axios.all([
          axios.get(`https://freegeoip.app/json/${ipAdd}`),
          axios.get(`http://ip-api.com/json/${ipAdd}?fields=29597184`)
        ]);
        return { ...freegeoipRes.data, ...ipapiRes.data };
    }catch (error){
        hereIsError(error, "findIPData");
    }
};
