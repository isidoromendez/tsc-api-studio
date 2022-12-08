import { NextFunction, Request, Response } from "express";

const logMiddleWare = ({baseUrl, body, params}:Request, res:Response, next:NextFunction) => {
    // TODO: inform: console.log(baseUrl, params.id, body);
    next();
}

export { logMiddleWare }