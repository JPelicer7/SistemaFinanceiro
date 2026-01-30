import { Router } from "express"

import { UserController } from "./controller/UserController"
import { UserService } from "./services/UserService"
import { prismaUserRepository } from "./repositories/prisma/prismaUserRepository"
import { prismaWalletRepository } from "./repositories/prisma/prismaWalletRepository"
import { ensureAuth } from "./middlewares/auth-middleware"

import { CategoriesController } from "./controller/CategoriesController"
import { CategoriesService } from "./services/CategoriesService"
import { prismaCategoriesRepository } from "./repositories/prisma/prismaCategoriesRepository"

const router = Router()

const userRepository = new prismaUserRepository()
const WalletRepository = new prismaWalletRepository()
const userService = new UserService(userRepository, WalletRepository)
const userController = new UserController(userService)

const cateRepository = new prismaCategoriesRepository()
const cateService = new CategoriesService(cateRepository)
const cateController = new CategoriesController(cateService)

// Rotas User
router.get("/user/:id", ensureAuth, userController.findById)
router.post("/register", userController.register)
router.post("/login", userController.login)

//Rotas categorias
router.post("/create/category", ensureAuth, cateController.create)
router.put("/category/:id", ensureAuth, cateController.update)
router.delete("/category/:id", ensureAuth, cateController.delete)

export {router}