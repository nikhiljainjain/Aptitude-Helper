import express, { Request, Response } from "express";
import { saveController } from "../../controllers";
import { cookieValid } from "../../services";

export const router = express.Router({
    strict: true
});

router.post('/ipAddress', (req: Request, res: Response)=>{
    saveController.ipAddress(req, res);
});

router.patch('/save/data', cookieValid, (req: Request, res: Response)=>{
    saveController.functionUsesCount(req, res);
});
