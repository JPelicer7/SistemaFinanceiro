import { WalletRepository, CreateWalletAttributes} from "../WalletRepository";
import {prisma} from "../../database"
import { Wallets } from "@prisma/client";



export class prismaWalletRepository implements WalletRepository {
    async create(params: CreateWalletAttributes): Promise<Wallets> {
        return prisma.wallets.create({
            data: params
        })
    }
}