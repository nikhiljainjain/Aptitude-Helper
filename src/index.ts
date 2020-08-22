//external packages using in this package
import express from 'express';
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import { config as dotenvConfig } from "dotenv";
import helmet from "helmet";
import rateLimit  from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import expressSession from "express-session";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";

dotenvConfig();
//module made by developers for this package
import { connectToMongo } from "./database/connect";
import redisClientConnect from "./database/redis";
import { ONE_DAY_TIME_IN_MSEC, API_VERSION, 
	PRODUCTION_ENV, invalidRes, COOKIE_PROP, mongo_store } from './config';
import { mainRouter } from './routes';

connectToMongo();
redisClientConnect;
const app = express();
const MongoStore = connectMongo(expressSession);

//defining log method
const logMethod =  PRODUCTION_ENV ? 'combined' : 'dev';
const limit = rateLimit({
	max: 100, //max requests
	windowMs: ONE_DAY_TIME_IN_MSEC, // one day lockout
	message: "TOO MANY REQUEST"
});

Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(morgan(logMethod));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || "",
    name: "sessionId",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: new MongoStore(mongo_store),
    cookie:{
        ...COOKIE_PROP
    }
}))

//calling fucntion only in production mode
if (PRODUCTION_ENV){
	app.disable("etag");
	app.use(Sentry.Handlers.requestHandler());
	app.use(helmet());
	app.use(limit);
	app.use(mongoSanitize());
}

app.use(`/`, mainRouter);

// catch 404 and forward to error handler
app.use((req, res)=>{
	res.locals = invalidRes;
	res.locals.data = "NOT FOUND";
	return res.status(404).json(res.locals);
});

export default app;
