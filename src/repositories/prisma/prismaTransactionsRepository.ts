import { Transactions } from "@prisma/client";
import { CreateTransactionsAttributes, TransactionsRepository } from "../TransactionsRepository";
import {prisma} from "../../database"

export class prismaTransactionsRepository implements TransactionsRepository {

    async getAll(userId: number): Promise<Transactions[]> {
        return prisma.transactions.findMany({
            where: {userId: userId}
        })
    }

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

    async delete(transactionId: number, userId: number): Promise<Transactions | null> {
        return prisma.transactions.delete({
            where: {id: transactionId, userId: userId}
        })
    }

    async update(transactionId: number, userId: number, attributes: Partial<CreateTransactionsAttributes>) {
        return prisma.transactions.update({
            where: {id: transactionId, userId},
            data: attributes
        })
    }
}