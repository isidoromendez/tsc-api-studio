import { Ship } from "../interfaces/ship.interface"
import ItemModel from "../models/item.model";

const insertDbItem = async (item:Ship) => {
    return await ItemModel.create(item);
}

const getDbItems = async () => {
    return await ItemModel.find({});
}

const getDbItem = async (id:string) => {
    return await ItemModel.find({_id:id});
}

const deleteDbItem = async (id:string) => {
    return await ItemModel.remove({_id:id});
}

const updateDbItem = async (id:string, data: Ship) => {
    return await ItemModel.findByIdAndUpdate(
        {_id:id},
        data,
        {
            new:true
        }
    );
}

export { insertDbItem, getDbItems, getDbItem, updateDbItem, deleteDbItem }