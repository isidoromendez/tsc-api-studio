import { Request, Response } from "express"
import { AuthService } from "../services/auth/auth.service";
import { handleHttp } from "../utils/error.handle";

const registerCtrl = async ({body}:Request, res:Response) => {
    try {
        res.send(await AuthService.registerUser(body));  
    } catch (error) {
        handleHttp(res,`ERROR_REGISTER_USER ${error}`);
    }
};

const loginCtrl = async ({body}:Request, res:Response) => {
    try {
        res.send(await AuthService.loginUser(body));  
    } catch (error) {
        handleHttp(res,`ERROR_LOGIN_USER ${error}`);
    }
};


export { registerCtrl, loginCtrl }