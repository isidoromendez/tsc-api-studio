import { compare, hash } from "bcryptjs";

const encrypt = async (password:string) => {
    return await hash(password,8);
};
const verify = async (password:string, passwordHash:string) => {
    return await compare(password,passwordHash);
};

export { encrypt, verify }