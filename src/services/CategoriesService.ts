import { HttpError } from "../error/HttpError";
import { CreateCategoriesAttributes, CategoriesRepository } from "../repositories/CategoriesRepository";

export class CategoriesService {
    constructor(private readonly CategoriesRepository:  CategoriesRepository) {}

    async create(params: CreateCategoriesAttributes) {
        const newCategory = await this.CategoriesRepository.create(params)
        if(!newCategory) throw new HttpError(401, "Não foi possível criar nova Categoria!")
        return newCategory
    }

    async delete(id: number, userId: number) {
        const deletedCategory = await this.CategoriesRepository.delete(id, userId)
        if(!deletedCategory) throw new HttpError(401, "Não foi possível excluir essa Categoria!")
        return deletedCategory
    }
    
    async update(id: number, userId: number, name: string) {
        const updatedCategory = await this.CategoriesRepository.update(id, userId, name)
        if(!updatedCategory) throw new HttpError(401, "Não foi possível atualizar essa categoria!")
        return updatedCategory
    }

}