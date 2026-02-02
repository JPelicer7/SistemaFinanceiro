import { userInfo } from "node:os";
import { HttpError } from "../error/HttpError";
import { CreateUserAttributes, UserRepository } from "../repositories/UserRepository";
import {WalletRepository } from "../repositories/WalletRepository";
import argon2 from "argon2";
import  jwt  from "jsonwebtoken";

export class UserService {
    constructor(private readonly UserRepository: UserRepository, private readonly WalletRepository: WalletRepository) {}

    async findById(id: number) {
        const user = await this.UserRepository.findById(id)
        if(!user) throw new HttpError(401, "Usuário não encontrado!")
        return user
    }

    async findByEmail(email: string) {
        const user = await this.UserRepository.findByEmail(email)
        if(!user) throw new HttpError(401, "Usuário não encontrado!")
        return user
    }

    async register(params: CreateUserAttributes) {
        const newUser = await this.UserRepository.register(params)
        if(!newUser) throw new HttpError(409, "Usuário já existente!")

        const newWallet = await this.WalletRepository.create({userId: newUser.id, balance: 0})
        if(!newWallet) throw new HttpError(401, "Não foi Possível criar a carteira do Usuário!")

        return newUser
    }

    async login(email: string, password: string) {
        const user = await this.UserRepository.findByEmail(email)
        if(!user) throw new HttpError(401, "Usuário inexistente!")
        
        //const wallet = await this.WalletRepository.findByUser(user.id)
        //if(!wallet) throw new HttpError(401, "Não foi possível carregar a Wallet do Usuário!")
        
        const validPassword = await argon2.verify(user.password, password)
        if(!validPassword) throw new HttpError(401, "Senha Inválida!")

            
        const payload = {id: user.id, email: user.email}
        const token = jwt.sign(payload, process.env.JWT_KEY!, {expiresIn: '1h'})

        return {user, token}
    }

} 