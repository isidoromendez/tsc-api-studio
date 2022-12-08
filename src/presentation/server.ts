import express from 'express'
import cors from "cors"
import AuthRouter from './routers/auth/auth'
const server = express()

server.use(express.urlencoded({extended: true}))
server.use(cors())
server.use(express.json());
server.use("/auth", AuthRouter())
export default server