import { Auth } from "../../interfaces/auth"
import { User } from "../../interfaces/user"
import { getUserModel } from "./user.model"
import { encrypt, verify } from "../../utils/bcrypt.handle"
import { generateToken } from "../../utils/jwt.handle"
import config from "../../../config";
import { Model } from "mongoose"
const AuthService = {

    registerUser: async (user:User) => {
        const userModel:Model<User> = getUserModel(config)
        if ( await userModel?.findOne({email:user.email}) )
            throw new Error(`Email already exist: ${user.email}`);
        user.password = await encrypt(user.password); 
        return await userModel?.create( user );
    },
    
    loginUser: async ({email, password}:Auth) => {
        const userModel:Model<User> = getUserModel(config)
        const user = await userModel?.findOne({ email })
        
        if (! user )
            throw new Error(`Invalid credentials`)
    
        if (! await verify(password,user.password))
            throw new Error(`Invalid credentials`)
    
        const token = generateToken(user.email)
    
        return { token, user }
    }
}

export { AuthService }