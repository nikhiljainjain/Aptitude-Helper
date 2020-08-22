import express, { Request, Response } from "express";
import { mainController } from "../../controllers";

export const router = express.Router({
    strict: true
});

router.post('/create', (req: Request, res: Response)=>{
    mainController.create(req, res);
});

router.get('/', (req: Request, res: Response)=>{
    mainController.read(req, res);
});

router.patch('/update', (req: Request, res: Response)=>{
    mainController.update(req, res);
});

router.delete('/remove', (req: Request, res: Response)=>{
    mainController.delete(req, res);
});
