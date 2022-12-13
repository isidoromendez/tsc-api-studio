import { Model, Schema } from "mongoose";
import { Config } from "presentation/interfaces/config";
import { User } from "../../interfaces/user";
import apiConn from "./db-connect";




const getUserModel = (config:Config):Model<User> => {
    const connection = apiConn(config)   
        
    const UserSchema = new Schema<User>(
        {
            name: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            description: {
                type: String,
                default: 'no description'
            },
            
        },
        {
            timestamps:true,
            versionKey:false
        }
    );

    return connection.model('users',UserSchema);
}
export { getUserModel };