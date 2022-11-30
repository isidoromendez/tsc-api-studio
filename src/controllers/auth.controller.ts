import { Request, Response } from "express"
import { loginUser, registerUser } from "../services/auth.service";
import { handleHttp } from "../utils/error.handle";

const registerCtrl = async ({body}:Request, res:Response) => {
    try {
        res.send(await registerUser(body));  
    } catch (error) {
        handleHttp(res,`ERROR_REGISTER_USER ${error}`);
    }
};

const loginCtrl = async ({body}:Request, res:Response) => {
    try {
        res.send(await loginUser(body));  
    } catch (error) {
        handleHttp(res,`ERROR_LOGIN_USER ${error}`);
    }
};


export { registerCtrl, loginCtrl }