import express, { Request, Response } from "express";
import { API_VERSION } from "../../config";

export const router = express.Router({
    strict: true
});

router.get('/', (req: Request, res: Response)=>{
    res.locals = { API_VERSION };
    return res.render("index", res.locals);
});
