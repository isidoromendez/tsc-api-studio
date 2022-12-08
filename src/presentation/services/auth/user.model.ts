import { Schema , model } from "mongoose";
import { User } from "../../interfaces/user";
import MongoConnection from "./db-connect";


const connection = MongoConnection.getInstance().getConnection()

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

const UserModel = connection.model('users',UserSchema);

export default UserModel;