import { HttpError } from "../error/HttpError";
import { Prisma } from "@prisma/client";
//import { Wallets } from "@prisma/client";
import { CreateTransactionsAttributes, TransactionsRepository} from "../repositories/TransactionsRepository";
import { WalletRepository } from "../repositories/WalletRepository";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

export class TransactionsService {
    constructor(private readonly TransactionsRepository: TransactionsRepository, private readonly WalletRepository: WalletRepository, private readonly CategoriesRepository: CategoriesRepository) {}

    async getAll(userId: number) {
        const transaction = await this.TransactionsRepository.getAll(userId)
        if(!transaction) throw new HttpError(401, "Não foi possível carregar as transações do Usuário!")
        return transaction
    }

    async findById(id: number) {
        const transaction = await this.TransactionsRepository.findById(id)
        if(!transaction) throw new HttpError(401, "Não foi possível encontrar essa transação!")
        return transaction
    }

    async create(params: Omit<CreateTransactionsAttributes, "walletId" | "userId" | "balance_after">, userId: number){
       
        const wallet = await this.WalletRepository.findByUser(userId)
        if(!wallet) throw new HttpError(401, "Não foi possível obter a carteria do User!")
        
        let newBalance = new Prisma.Decimal(wallet.balance)
        let amount = new Prisma.Decimal(params.amount)


        const category = await this.CategoriesRepository.findById(params.categoryId)
            if (!category || category.userId !== userId) {
                throw new HttpError(403, "Categoria inválida ou não pertence ao usuário!")
        }     


        if(params.type === "Receita") {
            newBalance = newBalance.plus(amount)
        }else {
            newBalance = newBalance.minus(amount)
        }
        
        const updatedWallet = await this.WalletRepository.updateBalance(wallet.id, +newBalance)
        
        const newTransaction = await this.TransactionsRepository.create({...params, walletId: wallet.id, balance_after: +newBalance, userId})
        return newTransaction
    }

    async delete(transactionId: number, userId: number) {
        const transaction = await this.TransactionsRepository.findById(transactionId)
        if(!transaction) throw new HttpError(401, "Transação Inexistente!")

        const wallet = await this.WalletRepository.findById(transaction.walletId)
        if(!wallet) throw new HttpError(401, "Não foi possível recuperar os dados da carteira!")
        
        let newBalance = new Prisma.Decimal(wallet.balance)
        const amount = new Prisma.Decimal(transaction.amount)
        
        if(transaction.type === "Receita") {
            newBalance = newBalance.minus(amount)
        } else {
            newBalance = newBalance.plus(amount)
        }
        
        const updatedWallet = await this.WalletRepository.updateBalance(wallet.id, +newBalance)

        const deletedTransaction = await this.TransactionsRepository.delete(transactionId, userId)
        return deletedTransaction
    }

    async update(transactionId: number, userId: number, params: Partial<CreateTransactionsAttributes>) {
        const transaction = await this.TransactionsRepository.findById(transactionId)
        if(!transaction) throw new HttpError(401, "Não foi possível encontrar a transação!")

        const wallet = await this.WalletRepository.findById(transaction.walletId)
        if(!wallet) throw new HttpError(401, "Não foi possível encontrar a Wallet")

        let balance = new Prisma.Decimal(wallet.balance)
        const oldAmount = new Prisma.Decimal(transaction.amount)

        if(transaction.type === "Receita") {
            balance = balance.minus(oldAmount)
        } else {
            balance = balance.plus(oldAmount)
        }

         const newAmount = new Prisma.Decimal(params.amount ?? transaction.amount)
         const newType = params.type ?? transaction.type

         if (newType === "Receita") {
            balance = balance.plus(newAmount)
        } else {
            balance = balance.minus(newAmount)
        }

        await this.WalletRepository.updateBalance(wallet.id, +balance)
        
        const newTransaction = await this.TransactionsRepository.update(transactionId, userId, params)
        return newTransaction
    }

}