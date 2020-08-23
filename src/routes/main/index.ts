import express, { Request, Response } from "express";

export const router = express.Router({
    strict: true
});

router.get('/', (req: Request, res: Response)=>{
    return res.render("index");
});
