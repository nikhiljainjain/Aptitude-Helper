import redisClientConnect from "../../database/redis";

import { hereIsError } from "../index";
import { WEEK_TIME_IN_MSEC } from "../../config";
import { promisify } from "util";

/**
 * promises for redis to code async & await
 */
const getAsync = promisify(redisClientConnect.get).bind(redisClientConnect);
const setAsync = promisify(redisClientConnect.set).bind(redisClientConnect);
const expireAsync = promisify(redisClientConnect.expire).bind(redisClientConnect);
const deleteAllAsync = promisify(redisClientConnect.flushall).bind(redisClientConnect);

/**
 * @description => this will set data expiration time for 
 * a data stored in redis
 * 
 * @param id 
 * @param expire 
 */
export const expireRedis = (id:string, expire?:number) =>{
    try{
        expireAsync(id, expire ? expire:WEEK_TIME_IN_MSEC);
    }catch(error){
        hereIsError(error, "expireRedis");
    }
}

/**
 * @description => saving data in redis
 * 
 * @param id 
 * @param jsonData 
 * @param expire 
 */
export const insertRedis = (id:string, jsonData:Object, expire?:number) =>{
    try{
        setAsync(id, JSON.stringify(jsonData));
        expireRedis(id, expire);
    }catch(error){
        hereIsError(error, "insertRedis");
    }
}

/**
 * @description => fetching data from redis 
 * 
 * @param id 
 */
export const getRedis = async (id:string) => {
    try{
        const data  = await getAsync(id);
        return (data ? JSON.parse(data):null);
    }catch(error){
        hereIsError(error, "getRedis");
    }
}

/**
 * @description => delete key from redis
 * 
 * @param id 
 */
export const deleteRedis = async (id:string) =>{
    try{
        redisClientConnect.del(id);
    }catch(error){
        hereIsError(error, "deleteRedis");
    }
}

/**
 * @description => delete all keys from db
 */
export const deleteAllRedis = async () =>{
    try{
        await deleteAllAsync();
    }catch(error){
        hereIsError(error, "deleteAllRedis");
    }
}
