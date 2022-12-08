import { Auth } from "../../interfaces/auth"
import { User } from "../../interfaces/user"
import UserModel from "./user.model"
import { encrypt, verify } from "../../utils/bcrypt.handle"
import { generateToken } from "../../utils/jwt.handle"

export default class AuthService{
    constructor(){}

    registerUser = async (user:User) => {
        if ( await UserModel.findOne({email:user.email}) )
            throw new Error(`Email already exist: ${user.email}`);
        user.password = await encrypt(user.password); 
        return await UserModel.create( user );
    }
    
    loginUser = async ({email, password}:Auth) => {
        const user = await UserModel.findOne({ email })
        
        if (! user )
            throw new Error(`Invalid credentials`)
    
        if (! await verify(password,user.password))
            throw new Error(`Invalid credentials`)
    
        const token = generateToken(user.email)
    
        return { token, user }
    }
}