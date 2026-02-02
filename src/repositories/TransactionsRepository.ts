import { Transactions } from "@prisma/client";
import { CategoryType } from "@prisma/client";



// export type CreateTransactionRepositoryInput = CreateTransactionsAttributes & {
//   walletId: number
//   balance_after: number
// }

export interface CreateTransactionsInput {
  categoryId: number
  type: CategoryType
  amount: number
  description: string
}


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
    getAll: (userId: number) => Promise<Transactions[]>
    findById: (id: number) => Promise<Transactions | null>
    create: (attributes: CreateTransactionsAttributes) => Promise<Transactions>
    delete: (transactionId: number, userId: number) => Promise<Transactions | null>
}   