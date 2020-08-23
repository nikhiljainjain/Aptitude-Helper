import { ONE_DAY_TIME_IN_MSEC } from "./index";
import { PRODUCTION_ENV } from "./constants";

//cookies age is 400 days calculated in microseconds
export const COOKIES_AGE = (ONE_DAY_TIME_IN_MSEC * 400);

//cookies property
export const COOKIE_PROP = {
    maxAge: ONE_DAY_TIME_IN_MSEC,
    path: '/',
    /*httpOnly: true,
    //secure will false if server running in dev or testing env
    secure: PRODUCTION_ENV,
    sameSite: true,
    domain: process.env.DOMAIN_NAME || ""*/
};

//mongo store option for development used for session storage
export const mongo_store = {
    url: process.env.MONGODB_URL || "",
    fallbackMemory: !PRODUCTION_ENV,
    touchAfter:  60//Interval (in seconds) between session updates in db
};
