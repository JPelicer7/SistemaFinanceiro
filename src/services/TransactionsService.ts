import { HttpError } from "../error/HttpError";
//import { Wallets } from "@prisma/client";
import { CreateTransactionsAttributes, TransactionsRepository } from "../repositories/TransactionsRepository";
import { WalletRepository } from "../repositories/WalletRepository";

export class TransactionsService {
    constructor(private readonly TransactionsRepository: TransactionsRepository, private readonly WalletRepository: WalletRepository) {}

    async findById(id: number) {
        const transaction = await this.TransactionsRepository.findById(id)
        if(!transaction) throw new HttpError(401, "Não foi possível encontrar essa transação!")
        return transaction
    }

    async create(params: CreateTransactionsAttributes) {
        const wallet = await this.WalletRepository
        //criar um findById para puxar a carteira
    }

}