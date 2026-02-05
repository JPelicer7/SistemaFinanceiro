import { MonthlySummary, Prisma } from "@prisma/client";


export interface CreateSummaryAttributes {
    userId: number, 
    month: number,
    year: number,
    totalReceita: Prisma.Decimal,
    totalDespesa: Prisma.Decimal,
    totalBalance: Prisma.Decimal,
    created_At: Date
}

export interface SummaryRepository {
    findById: (id: number) => Promise<MonthlySummary | null>
    create: (attributes: CreateSummaryAttributes) => Promise<MonthlySummary>
    getAll: (userId: number) => Promise<MonthlySummary[]>
    delete: (id : number, userId: number) => Promise<MonthlySummary | null>
}