import { Router } from "express"

import { UserController } from "./controller/UserController"
import { UserService } from "./services/UserService"
import { prismaUserRepository } from "./repositories/prisma/prismaUserRepository"
import { prismaWalletRepository } from "./repositories/prisma/prismaWalletRepository"
import { ensureAuth } from "./middlewares/auth-middleware"

import { CategoriesController } from "./controller/CategoriesController"
import { CategoriesService } from "./services/CategoriesService"
import { prismaCategoriesRepository } from "./repositories/prisma/prismaCategoriesRepository"

import { TransactionsController } from "./controller/TransactionsController"
import { TransactionsService } from "./services/TransactionsService"
import { prismaTransactionsRepository } from "./repositories/prisma/prismaTransactionsRepository"

import { SummaryController } from "./controller/SummaryController"
import { SummaryService } from "./services/SummaryService"
import { prismaSummaryRepository } from "./repositories/prisma/prismaSummaryRepository"

import { WalletController } from "./controller/WalletController"
import { WalletService } from "./services/WalletService"


const router = Router()

const userRepository = new prismaUserRepository()
const WalletRepository = new prismaWalletRepository()
const userService = new UserService(userRepository, WalletRepository)
const userController = new UserController(userService)

const cateRepository = new prismaCategoriesRepository()
const cateService = new CategoriesService(cateRepository)
const cateController = new CategoriesController(cateService)

const transRepository = new prismaTransactionsRepository()
const transService = new TransactionsService(transRepository, WalletRepository, cateRepository)
const transController = new TransactionsController(transService)

const summaryRepository = new prismaSummaryRepository()
const summaryService = new SummaryService(summaryRepository, WalletRepository, transRepository)
const summaryController = new SummaryController(summaryService)

const walletRepository = new prismaWalletRepository()
const walletService = new WalletService(walletRepository)
const walletController = new WalletController(walletService)

// Rotas User
router.get("/user/:id", ensureAuth, userController.findById)
router.post("/register", userController.register)
router.post("/login", userController.login)

//Rotas categorias
router.get("/category", ensureAuth, cateController.getAll)
router.post("/create/category", ensureAuth, cateController.create)
router.put("/category/:id", ensureAuth, cateController.update)
router.delete("/category/:id", ensureAuth, cateController.delete)

//rotas Transactions
router.get("/transactions", ensureAuth, transController.getAll)
router.get("/transaction/:id", ensureAuth, transController.findById)
router.post("/create/transaction", ensureAuth, transController.create)
router.put("/transaction/update/:id", ensureAuth, transController.update)
router.delete("/transaction/delete/:id", ensureAuth, transController.delete)
//router.delete("/transaction/deleteAll", ensureAuth, transController.deleteAll)

// rotas Summario
router.get("/summary", ensureAuth, summaryController.getAll)
router.post("/create/summary", ensureAuth, summaryController.create)
router.delete("/delete/summary/:id", ensureAuth, summaryController.delete)


//rotas Wallet
router.get("/wallet", ensureAuth, walletController.findByUser)


export {router}