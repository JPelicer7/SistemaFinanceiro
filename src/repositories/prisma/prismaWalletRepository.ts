import { WalletRepository, CreateWalletAttributes} from "../WalletRepository";
import {prisma} from "../../database"
import { Wallets } from "@prisma/client";



export class prismaWalletRepository implements WalletRepository {

    async findById(id: number): Promise<Wallets | null> {
        return prisma.wallets.findUnique({
            where: {id}
        })
    }

    async findByUser(userId: number): Promise<Wallets | null> {
        return prisma.wallets.findFirst({
            where: {userId}
        })
    }

    async create(params: CreateWalletAttributes): Promise<Wallets> {
        return prisma.wallets.create({
            data: params
        })
    }

    async updateBalance(id: number, balance: number): Promise<Wallets> {
        return prisma.wallets.update({
            data: {balance},
            where: {id}
        })
    }
}