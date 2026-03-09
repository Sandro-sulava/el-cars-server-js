-- CreateTable
CREATE TABLE "LuxuryCar" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LuxuryCar_pkey" PRIMARY KEY ("id")
);
