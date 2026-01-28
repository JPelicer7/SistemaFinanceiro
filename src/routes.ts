import { Router } from "express"

import { UserController } from "./controller/UserController"
import { UserService } from "./services/UserService"
import { prismaUserRepository } from "./repositories/prisma/prismaUserRepository"
import { prismaWalletRepository } from "./repositories/prisma/prismaWalletRepository"
import { ensureAuth } from "./middlewares/auth-middleware"


const router = Router()

const userRepository = new prismaUserRepository()
const WalletRepository = new prismaWalletRepository()
const userService = new UserService(userRepository, WalletRepository)
const userController = new UserController(userService)

// Rotas User
router.get("/user/:id", ensureAuth, userController.findById)
router.post("/register", userController.register)
router.post("/login", userController.login)





export {router}