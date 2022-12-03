import { Ship } from '../interfaces/ship.interface';
import ItemModel from '../models/item.model';

const insertDbItem = async (item:Ship):Promise<Ship> => (await ItemModel.create(item)) as Ship;

const getDbItems = async () => await ItemModel.find({});

const getDbItem = async (id:string) => await ItemModel.find({ _id: id });

const deleteDbItem = async (id:string) => await ItemModel.remove({ _id: id });

const updateDbItem = async (id:string, data: Ship) : Promise<Ship | null> => 
  await ItemModel.findByIdAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    },
  );

export {
  insertDbItem, getDbItems, getDbItem, updateDbItem, deleteDbItem,
};