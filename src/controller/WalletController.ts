import { Handler } from "express";
import { WalletService } from "../services/WalletService";

export class WalletController {
    constructor(private readonly  WalletService: WalletService) {}

    findByUser: Handler = async(req, res, next) => {
        try {
            const user = (req as any).user
            const userId = user.id
            
            const wallet = await this.WalletService.findByUser(userId)
            res.json(wallet)

        } catch (error) {
            next(error)
        }
    }
}