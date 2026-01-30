import { CategoriesService } from "../services/CategoriesService";
import { Handler } from "express";
import { CreateCategoriesRequestSchema } from "./schemas/CategoriesRequestSchema";

export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) {}

    create: Handler = async(req, res,  next) => {
        try {

            const {name}  = req.body
            const user = (req as any).user
            const userId = user.id

            const newCategories = await this.CategoriesService.create({name, userId})
            res.status(201).json(newCategories)

        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async(req, res, next) => {
        try {
            const id = req.params.id
            const user = (req as any).user
            const userId = user.id

            const deletedCategory = await this.CategoriesService.delete(+id, userId)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async(req, res, next) => {
        try {
            const id = req.params.id
            const user = (req as any).user
            const userId = user.id
            const {name} = req.body

            const updatedCategory = await this.CategoriesService.update(+id, userId, name)
            res.status(200).json(updatedCategory)
            
        } catch (error) {
            next(error)
        }
    }


    findById: Handler = async(req, res, next) => {
        try {
            const id = req.params
            const category = await this.CategoriesService.findById(+id)
            res.json(category)
        } catch (error) {
            next(error)
        }
    }
}