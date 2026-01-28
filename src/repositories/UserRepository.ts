import { User } from "../../generated/prisma"


export interface CreateUserAttributes {
    name: string,
    email: string,
    password: string,
    created_at?: Date
}



export interface UserRepository {
    findById: (id: number) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
    register: (attributes: CreateUserAttributes) => Promise<User>
}   