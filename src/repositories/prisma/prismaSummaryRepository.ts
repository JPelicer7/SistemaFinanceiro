import { SummaryRepository, CreateSummaryAttributes } from "../SummaryRepository";
import {prisma} from "../../database"
import { MonthlySummary } from "@prisma/client";


export class prismaSummaryRepository implements SummaryRepository {
    async create(attributes: CreateSummaryAttributes): Promise<MonthlySummary> {
        return prisma.monthlySummary.create({
            data: attributes
        })
    }

    async getAll(userId: number): Promise<MonthlySummary[]> {
        return prisma.monthlySummary.findMany({
            where: {userId}
        })
    }

    async delete(id: number, userId: number): Promise<MonthlySummary | null> {
        return prisma.monthlySummary.delete({
            where: {id, userId}
        })
    }

    async findById(id: number): Promise<MonthlySummary | null> {
        return prisma.monthlySummary.findUnique({
            where: {id} 
        })
    }
}