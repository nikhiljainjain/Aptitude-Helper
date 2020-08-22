import { Request, Response } from "express";

import { CrudController } from "../crud-controller";
import { hereIsError } from "../../services";

export class MainController extends CrudController {
    public async list(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) {
        throw new Error("Method not implemented.");
    }
    
    public async create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) {
        throw new Error("Method not implemented.");
    }

    public async read(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) {
        try{
            
        }catch(error){
            hereIsError(error, req.originalUrl);
        }
    }

    public async update(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) {
        throw new Error("Method not implemented.");
    }

    public async delete(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) {
        throw new Error("Method not implemented.");
    } 

}
