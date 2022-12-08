import { CreateShipUseCase } from 'domain/interfaces/use-cases/ship/create-ship';
import { GetAllShipsUseCase } from 'domain/interfaces/use-cases/ship/get-all-ships';
import { Request, Response, Router } from 'express'


export default function ShipRouter(
    getAllShipsUseCase: GetAllShipsUseCase,
    createShiptUseCase: CreateShipUseCase
) {
    const router = Router();
    router.get('/', async (req: Request, res: Response) => {
        try {
            const ships = await getAllShipsUseCase.execute()
            res.send(ships)
        } catch (err) {
            res.status(500).send({ 
                err,
                message: "Error fetching data" })
        }
    }) 

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createShiptUseCase.execute(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            res.status(500).send({ message: "Error saving data" })
        }
    })

    return router
}   