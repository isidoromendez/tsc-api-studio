import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface RequestExtended extends Request {
    user?: string | JwtPayload;
}

export { RequestExtended }