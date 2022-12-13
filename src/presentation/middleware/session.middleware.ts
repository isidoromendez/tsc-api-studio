import { NextFunction, Request, Response } from "express"
import { RequestExtended } from "../interfaces/request-extended.interface";
import { handleHttp } from "../utils/error.handle"
import { verifyToken } from "../utils/jwt.handle";

const checkJwtSession = (req:RequestExtended, res:Response, next:NextFunction) => {
    try {
        const bearer = req.headers.authorization || '';
        const jwt = bearer.split(' ').pop();
        const user = verifyToken(`${jwt}`);
         if ( !user ){
            res.status(401);
            handleHttp(res, 'Invalid token');    
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400);
        handleHttp(res, 'Invalid session');
    }
}

export { checkJwtSession }