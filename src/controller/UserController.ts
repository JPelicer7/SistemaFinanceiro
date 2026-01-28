import { RegisterUserRequestSchema, LoginUserRequestSchema } from "./schemas/UserRequestSchema";
import { Handler } from "express";
import { UserService } from "../services/UserService";
import argon2 from "argon2";

export class UserController {
    constructor(private readonly UserService: UserService) {}

    register: Handler = async(req, res, next) => {
        try {

            const body = RegisterUserRequestSchema.parse(req.body)
            const encryptedPassword = await argon2.hash(body.password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16,   
                timeCost: 5,           
                parallelism: 1         
            });
            body.password = encryptedPassword

            const newUser = await this.UserService.register(body)
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    login: Handler = async(req,res, next) => {
        try {
            
            const body = LoginUserRequestSchema.parse(req.body)
            const loginUser = await this.UserService.login(body.email, body.password)
            res.json(loginUser)

        } catch (error) {
            next(error)
        }
    }




    findById: Handler = async(req, res, next) => {
        try {

            const id = req.params.id
            const user = await this.UserService.findById(+id)
            res.json(user)

        } catch (error) {
            next(error)
        }
    }

    findByEmail: Handler = async(req,res, next) => {
        try {

            const email = req.body
            const user = await this.UserService.findByEmail(email)
            res.json(user)

        } catch (error) {
            next(error)
        }
    }

}