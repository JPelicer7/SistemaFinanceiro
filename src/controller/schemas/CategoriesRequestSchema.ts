import {z} from "zod";

export const CreateCategoriesRequestSchema = z.object({
    name: z.string()
    // userId: z.number()
})
