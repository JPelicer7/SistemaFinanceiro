import { createTransactionsRequestSchema } from "./schemas/TransactionsRequestSchema";
import { Handler } from "express";
import { TransactionsService } from "../services/TransactionsService";


export class TransactionsController {
    constructor(private readonly TransactionsService: TransactionsService) {}

    create: Handler = async(req, res, next) => {
        try {
            
            const params =  createTransactionsRequestSchema.parse(req.body)
            const user = (req as any).user
            const userId = user.id

            const newTransactions = await this.TransactionsService.create(params, userId)

            res.status(201).json(newTransactions)

        } catch (error) {
            next(error)
        }
    }

}