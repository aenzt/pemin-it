-- CreateEnum
CREATE TYPE "LetterType" AS ENUM ('masuk', 'keluar');

-- CreateEnum
CREATE TYPE "LetterStatus" AS ENUM ('selesai', 'dalam_proses', 'ditolak');

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "sex" CHAR(1) NOT NULL,
    "hashedRefreshToken" TEXT,
    "idDivision" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "division" (
    "idDivision" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "division_pkey" PRIMARY KEY ("idDivision")
);

-- CreateTable
CREATE TABLE "legal_letter" (
    "idLetter" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "endedAt" TEXT NOT NULL,
    "startedAt" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "LetterStatus" NOT NULL,
    "type" "LetterType" NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "legal_letter_pkey" PRIMARY KEY ("idLetter")
);

-- CreateTable
CREATE TABLE "legal_contract" (
    "idContract" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractName" TEXT NOT NULL,
    "fileAttachment" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "legal_contract_pkey" PRIMARY KEY ("idContract")
);

-- CreateTable
CREATE TABLE "mining_schedule" (
    "idSchedule" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "mining_schedule_pkey" PRIMARY KEY ("idSchedule")
);

-- CreateTable
CREATE TABLE "employee_on_mining" (
    "employeeId" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_on_mining_pkey" PRIMARY KEY ("employeeId","scheduleId")
);

-- CreateTable
CREATE TABLE "mining_assets" (
    "idAsset" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastUsedById" INTEGER NOT NULL,
    "fileAttachment" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "mining_assets_pkey" PRIMARY KEY ("idAsset")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "seller_name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_idDivision_key" ON "employees"("idDivision");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_idDivision_fkey" FOREIGN KEY ("idDivision") REFERENCES "division"("idDivision") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_on_mining" ADD CONSTRAINT "employee_on_mining_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_on_mining" ADD CONSTRAINT "employee_on_mining_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "mining_schedule"("idSchedule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mining_assets" ADD CONSTRAINT "mining_assets_lastUsedById_fkey" FOREIGN KEY ("lastUsedById") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
