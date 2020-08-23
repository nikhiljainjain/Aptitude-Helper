import express, { Request, Response } from "express";
import { saveController } from "../../controllers";
import { cookieValid } from "../../services";

export const router = express.Router({
    strict: true
});

router.post('/unknown', (req: Request, res: Response)=>{
    saveController.ipAddress(req, res);
});

router.post('/words', cookieValid, (req: Request, res: Response)=>{
    saveController.functionUsesCount(req, res);
});
