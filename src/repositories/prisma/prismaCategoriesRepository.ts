import { Categories } from "@prisma/client";
import { CategoriesRepository, CreateCategoriesAttributes } from "../CategoriesRepository";
import {prisma} from "../../database"

export class prismaCategoriesRepository implements CategoriesRepository {

    async create(params: CreateCategoriesAttributes): Promise<Categories> {
        return prisma.categories.create({
            data: params
        })
    }

    async delete(id: number, userId: number): Promise<Categories | null> {
        return prisma.categories.delete({
            where: {id, userId}
        })
    }

    async update(id: number, userId: number, name: string): Promise<Categories | null> {
        return prisma.categories.update({
            data: {name},
            where: {id, userId}
        })
    }
}