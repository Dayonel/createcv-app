import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const adapter = new PrismaD1(process.env.DB);
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
