-- CreateTable
CREATE TABLE "MonthlySummary" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalReceita" DECIMAL(65,30) NOT NULL,
    "totalDespesa" DECIMAL(65,30) NOT NULL,
    "totalBalance" DECIMAL(65,30) NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthlySummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlySummary" ADD CONSTRAINT "MonthlySummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
