const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  await prisma.electricCar.createMany({
    data: [],
  });

  await prisma.luxuryCar.createMany({
    data: [],
  });
  await prisma.user.createMany({
    data: [],
  });
}
seed().then(() => prisma.$disconnect());
