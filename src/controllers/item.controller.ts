import { Request, Response } from "express"
import { RequestExtended } from "../interfaces/request-extended.interface";
import { insertDbItem, getDbItems, getDbItem, updateDbItem, deleteDbItem } from "../services/item.service";
import { handleHttp } from "../utils/error.handle"

const getItems = async (req:Request,res:Response) => {
    try {
        res.send(await getDbItems());
    } catch (error) {
        handleHttp(res,`ERROR_GET_ITEMS ${error}`);
    }
}

const getItem = async ({params}:Request,res:Response) => {
    try {        
        const {id} = params;
        res.send(await getDbItem(id));
    } catch (error) {
        handleHttp(res,`ERROR_GET_ITEM ${error}`);
    }
}

const updateItem = async ({params, body}:Request,res:Response) => {
    try {
        const {id} = params;
        res.send(await updateDbItem(id, body));
    } catch (error) {
        handleHttp(res,`ERROR_UPDATE_ITEM ${error}`);
    }
}

const postItem = async ({body, user}:RequestExtended,res:Response) => {
    try {
        const response = await insertDbItem(body); 
        res.send({ user, data:response});
    } catch (error) {
        handleHttp(res,`ERROR_POST_ITEM ${error}`);
    }
}
const deleteItem = async ({params}:Request,res:Response) => {
    try {
        const {id} = params;
        res.send(await deleteDbItem(id));
    } catch (error) {
        handleHttp(res,`ERROR_DELETE_ITEM ${error}`);
    }
}

export { getItem, getItems, updateItem, postItem, deleteItem }