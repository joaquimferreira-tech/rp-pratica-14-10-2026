import express from 'express'
import { frutasServices } from '../services/frutas.service.js'

export const frutasRouter = express.Router()

frutasRouter.get('/', async (req, res) => {
    try {
        const frutas = await frutasServices.getAll()
        return res.json(frutas)
    } catch (error) {
        console.error("Erro ao procurar frutas:", error)
        return res.status(500).json({ error: "Erro interno do servidor ao carregar frutas." })
    }
})