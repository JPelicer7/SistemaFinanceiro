import { HttpError } from "../error/HttpError";
import {WalletRepository } from "../repositories/WalletRepository";

export class WalletService {
    constructor(private readonly WalletRepository: WalletRepository) {}

    async findByUser(userId: number) {
        const wallet = await this.WalletRepository.findByUser(userId)
        if(!wallet) throw new HttpError(401, "Wallet não encontrada!")
        return wallet
    }
}