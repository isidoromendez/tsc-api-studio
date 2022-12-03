import { Router } from "express";
import { readdirSync } from "fs";
const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName : string) : string => {
    return (fileName.includes('.'))? fileName.split('.').shift() as string : fileName;
}

readdirSync(PATH_ROUTER)
    .map((fileName)=> cleanFileName(fileName))
    .filter((fileName) => {
        return fileName != 'index'; 
    })
    .forEach((fileName)=>{
        import(`./${fileName}`).then((routerModule)=>{
            router.use(`/${fileName}`,routerModule.router);
            // TODO: inform: console.log(`importing route: /${fileName}`);
        });
        
        
    });

export { router }