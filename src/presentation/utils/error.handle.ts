import { Response } from "express";

const handleHttp = (res:Response, msg: string) => {
    res.status(500);
    res.send({ error: msg })
}

export { handleHttp }