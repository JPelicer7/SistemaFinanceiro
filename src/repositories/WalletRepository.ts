import { Wallets } from "@prisma/client";


export interface CreateWalletAttributes {
    userId: number,
    balance: number
}


export interface WalletRepository {
    create: (attributes: CreateWalletAttributes) => Promise<Wallets>
}