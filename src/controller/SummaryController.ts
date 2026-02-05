import { Handler } from "express";
import { SummaryService } from "../services/SummaryService";

export class SummaryController {
    constructor(private readonly SummaryService: SummaryService) {}

    create: Handler = async(req, res, next) => {
        try {
            const user = (req as any).user
            const userId = user.id

            const newSummary = await this.SummaryService.create(userId)
            res.status(201).json(newSummary)
        } catch (error) {
            next(error)
        }
    }

    getAll: Handler = async(req, res, next) => {
        try {
            const user = (req as any).user
            const userId = user.id

            const allSummary = await this.SummaryService.getAll(userId)
            res.json(allSummary)
        } catch (error) {
            next(error)
        }
    }

    delete:  Handler = async(req, res, next) => {
        try {

            const user = (req as any).user
            const userId = user.id
            const id = req.params.id

            const deletedSummary = await this.SummaryService.delete(+id, userId)
            res.status(204).send()

        } catch (error) {
            next(error)
        }
    }
}