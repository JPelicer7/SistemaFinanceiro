import { Categories } from "@prisma/client";



export interface CreateCategoriesAttributes {
    userId: number,
    name: string
}


export interface CategoriesRepository {
    create: (attributes: CreateCategoriesAttributes) => Promise<Categories>
    delete: (id: number, userId: number) => Promise<Categories | null>
    update: (id: number, userId: number, name: string) => Promise<Categories | null>
    findById: (id: number) => Promise<Categories | null>
    getAll: (userId: number) => Promise<Categories[]>
}