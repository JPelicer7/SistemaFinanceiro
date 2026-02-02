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

    delete: Handler = async(req, res, next) => {
        try {
           const transactionId = req.params.id 
           const user = (req as any).user
           const userId = user.id
           const deletedTransaction = await this.TransactionsService.delete(+transactionId,userId)
           
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    findById: Handler = async(req, res, next) => {
        try {
            const id = req.params.id
            const transaction = await this.TransactionsService.findById(+id)
            res.json(transaction)
        } catch (error) {
            next(error)
        }
    }

    getAll: Handler = async(req, res, next) => {
        try {
           const user = (req as any).user
           const userId = user.id

           const transactions = await this.TransactionsService.getAll(userId)
           res.json(transactions)

        } catch (error) {
            next(error)
        }
    }

}