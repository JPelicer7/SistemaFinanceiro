import { HttpError } from "../error/HttpError";
import { Prisma } from "@prisma/client";
//import { Wallets } from "@prisma/client";
import { CreateTransactionsAttributes, TransactionsRepository} from "../repositories/TransactionsRepository";
import { WalletRepository } from "../repositories/WalletRepository";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

export class TransactionsService {
    constructor(private readonly TransactionsRepository: TransactionsRepository, private readonly WalletRepository: WalletRepository, private readonly CategoriesRepository: CategoriesRepository) {}

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

}