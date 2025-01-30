-- CreateEnum
CREATE TYPE "bank-account-type" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- CreateTable
CREATE TABLE "bank_account" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" "bank-account-type" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id")
);
