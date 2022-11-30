import { NextFunction, Request, Response } from "express";

const logMiddleWare = ({baseUrl, body, params}:Request, res:Response, next:NextFunction) => {
    console.log(baseUrl, params.id, body);
    next();
}

export { logMiddleWare }