import { connect, disconnect, Mongoose } from "mongoose";

// Database URL Picker
const DB_PARA = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

/**
 * Connect to MonngoDB via mongoose
 * @param {boolean} production_env - Param if production environment is to be used
 */
export const connectToMongo = async (): Promise<Mongoose | undefined> => {
	const DB_URI = process.env.MONGODB_URL || "mongodb://localhost:27017/test";
    try {
        let mongooseInstance: Mongoose = await connect(DB_URI, DB_PARA);
        mongooseInstance ? console.log("Connected to Database"):null;
        return mongooseInstance;
    } catch (error) {
        console.error("Connection Error: ", error);
    }
};

/**
 * Disconnects from MongoDB via mongoose
 */
export const closeFunc = (): Promise<void> => {
	console.log("Connection close");
	return disconnect();
};
