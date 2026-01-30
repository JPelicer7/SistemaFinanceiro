import { Transactions } from "@prisma/client";
import { CreateTransactionsAttributes, TransactionsRepository } from "../TransactionsRepository";
import {prisma} from "../../database"

export class prismaTransactionsRepository implements TransactionsRepository {

    async findById(id: number): Promise<Transactions | null> {
        return prisma.transactions.findUnique({
            where: {id}
        })
    }

    async create(attributes: CreateTransactionsAttributes): Promise<Transactions> {
        return prisma.transactions.create({
            data: attributes,
           
        })
    }

}