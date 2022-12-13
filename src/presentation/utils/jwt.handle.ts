import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'token'

const generateToken = (email:string) => {
    return sign({ email },JWT_SECRET, {
        expiresIn: '2h'
    });
};

const verifyToken = (jwt:string) => {
    return verify( jwt, JWT_SECRET); 
};

export { generateToken, verifyToken }