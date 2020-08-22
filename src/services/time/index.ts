import { ONE_DAY_TIME_IN_MSEC } from "../../config";
import { hereIsError } from "../index";

/**
 * @description => calculate number of days between start & end date
 * 
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
export const calculateDays = async (startDate:Date, endDate?:Date)=>{
	try{
		const startedDate = new Date(startDate);
		const endingDate = new Date(endDate ? endDate:Date.now());
		const diff_ms = endingDate.getTime() - startedDate.getTime();
		
		const days = Math.round(diff_ms/ONE_DAY_TIME_IN_MSEC); 
		return days;
	}catch(error){
        hereIsError(error, "calculateDays");
	}
};
