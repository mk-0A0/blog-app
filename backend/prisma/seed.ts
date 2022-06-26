import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// モデル投入用のデータ定義
const initialUser: User = {
  id: 1,
  uuid: 'fa119cb6-9135-57f5-8a5a-54f28d566d0e',
  email: 'user@example.com',
  password: '123456',
  name: 'user',
};
const doSeed = async () => {
  return await prisma.$transaction([prisma.user.create({ data: initialUser })]);
};

const main = async () => {
  console.log(`Start seeding ...`);

  await doSeed();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
