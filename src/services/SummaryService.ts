import { HttpError } from "../error/HttpError";
import { SummaryRepository, CreateSummaryAttributes } from "../repositories/SummaryRepository";
import { Prisma } from "@prisma/client";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { WalletRepository } from "../repositories/WalletRepository";

export class SummaryService {
    constructor(private readonly SummaryRepository: SummaryRepository, private readonly WalletRepository: WalletRepository, private readonly TransactionsRepository: TransactionsRepository) {}

    async create(userId: number) {
        const wallet = await this.WalletRepository.findByUser(userId)
        if(!wallet) throw new HttpError(401, "Não foi possível encontrar a carteira do Usuário")
        
        const transactions = await this.TransactionsRepository.getAll(userId)
        if(!transactions) throw new HttpError(401, "Não foi possível encontrar as transações do Usuário")

        let totalReceita = new Prisma.Decimal(0)
        let totalDespesa = new Prisma.Decimal(0)

        for(const t of transactions) {
            if(t.type === "Receita") {
                totalReceita = totalReceita.plus(t.amount)
            }else {
                totalDespesa = totalDespesa.minus(t.amount)
            }
        }

        let totalBalance = wallet.balance
       
        const newSummary = await this.SummaryRepository.create({
            userId: userId, month: new Date().getMonth() + 1, year: new Date().getFullYear(),
            totalReceita, 
            totalDespesa: totalDespesa,
            totalBalance: totalBalance, 
            created_At: new Date()
        })
        if(!newSummary) throw new HttpError(401, "Não foi possível criar o Sumário de Transações!")

        const updatedBalance = await this.WalletRepository.updateBalance(wallet.id, +totalBalance)
        if(!updatedBalance) throw new HttpError(401, "Não foi possível atualizar a Wallet do Usuário!")

        const deletedTransactions = await this.TransactionsRepository.deleteAll(userId)
        if(!deletedTransactions) throw new HttpError(401, "Não foi possível deletar as transações!")

        return {newSummary, deletedTransactions}
    }

    async getAll(userId: number) {
        const allSummary = await this.SummaryRepository.getAll(userId)
        if(!allSummary) throw new HttpError(401, "Não foi possível carregar os sumários do Usuário!")
        return allSummary
    }

    async delete(id: number, userId: number) {
        const summary = await this.SummaryRepository.findById(id)
        if(!summary) throw new HttpError(401, "Não foi possível encontrar este resumo!")
        
        const deletedSummary = await this.SummaryRepository.delete(id, userId)
        return deletedSummary
    }
}