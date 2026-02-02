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


    async findById(id: number) {
        const category = await this.CategoriesRepository.findById(id)
        if(!category) throw new HttpError(401, "Categoria Inexistente!")
        return category
    }

    async getAll(userId: number) {
        const categories = await this.CategoriesRepository.getAll(userId)
        if(!categories) throw new HttpError(401, "Não foi possível carregar as Categorias do Usuário!")
        return categories
    }

}