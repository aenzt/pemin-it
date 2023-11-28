import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const division1 = await prisma.division.upsert({
    where: { idDivision: 'mining' },
    update: {},
    create: {
      idDivision: 'mining',
      name: 'Mining',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const division2 = await prisma.division.upsert({
    where: { idDivision: 'finance' },
    update: {},
    create: {
      idDivision: 'finance',
      name: 'Finance',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const division3 = await prisma.division.upsert({
    where: { idDivision: 'rnd' },
    update: {},
    create: {
      idDivision: 'rnd',
      name: 'Research and Development',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const division4 = await prisma.division.upsert({
    where: { idDivision: 'legal' },
    update: {},
    create: {
      idDivision: 'legal',
      name: 'Legal',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const division5 = await prisma.division.upsert({
    where: { idDivision: 'salesmarketing' },
    update: {},
    create: {
      idDivision: 'salesmarketing',
      name: 'Sales and Marketing',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const division6 = await prisma.division.upsert({
    where: { idDivision: 'hrd' },
    update: {},
    create: {
      idDivision: 'hrd',
      name: 'Human Resource Development',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const division7 = await prisma.division.upsert({
    where: { idDivision: 'it' },
    update: {},
    create: {
      idDivision: 'it',
      name: 'Information Technology',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
