import { Schema , Types, model , Model } from "mongoose";
import { Ship } from "../interfaces/ship.interface";

const ItemSchema = new Schema<Ship>(
    {
        name: {
            type: String,
            required: true
        },
        gas: {
            type : String,
            enum : ['electric','protocultur','solid'],
            required: true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);

const ItemModel = model('items',ItemSchema);

export default ItemModel;