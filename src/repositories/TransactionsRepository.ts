import { Transactions } from "@prisma/client";
import { CategoryType } from "@prisma/client";



export interface CreateTransactionsAttributes {
    userId: number,
    walletId: number,
    categoryId: number,
    type: CategoryType,
    amount: number,
    description: string,
    balance_after: number
}



export interface TransactionsRepository {
    findById: (id: number) => Promise<Transactions | null>
    create: (attributes: CreateTransactionsAttributes) => Promise<Transactions>
}   