import { CreateUserAttributes, UserRepository } from "../UserRepository";
import {prisma} from "../../database"
//import {User} from "../../../generated/prisma"
import { User } from "@prisma/client";



export class prismaUserRepository implements UserRepository {
    
    async findById(id: number):  Promise<User | null> {
        return prisma.user.findUnique({
            where: {id} 
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {email}
        })
    }

    
    async register(attributes: CreateUserAttributes): Promise<User> {
        return await prisma.user.create({
            data: attributes
        })
    }

}