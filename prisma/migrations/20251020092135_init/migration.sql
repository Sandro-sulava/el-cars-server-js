-- CreateTable
CREATE TABLE "ElectricCar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "topSpeed" TEXT NOT NULL,
    "engineType" TEXT NOT NULL,
    "zeroToHundred" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElectricCar_pkey" PRIMARY KEY ("id")
);
