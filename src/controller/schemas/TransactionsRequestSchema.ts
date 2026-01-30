import { CategoryType } from "@prisma/client";
import {z} from "zod";





export const createTransactionsRequestSchema = z.object({
   // walletId: z.number(),
    //userId: z.number(),
    categoryId: z.number(),
    type: z.enum(CategoryType),
    amount: z.number(),
    description: z.string(),
   // balance_after: z.number()
})
