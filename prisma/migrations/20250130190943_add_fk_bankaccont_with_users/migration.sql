/*
  Warnings:

  - You are about to drop the `bank_account` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "bank_account_type" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- DropTable
DROP TABLE "bank_account";

-- DropEnum
DROP TYPE "bank-account-type";

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" "bank_account_type" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
