import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.chatMessage.deleteMany();
  console.log("Mensagens de chat legadas removidas:", deleted.count);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
