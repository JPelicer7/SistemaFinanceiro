import { Wallets } from "@prisma/client";


export interface CreateWalletAttributes {
    userId: number,
    balance: number
}


export interface WalletRepository {
    findById: (id: number) => Promise<Wallets | null>
    findByUser: (userId: number) => Promise<Wallets | null>
    create: (attributes: CreateWalletAttributes) => Promise<Wallets>
    updateBalance: (id: number, balance: number) => Promise<Wallets>
}