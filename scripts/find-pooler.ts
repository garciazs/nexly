import { PrismaClient } from "@prisma/client";

const password = encodeURIComponent("1504garciA@2009");
const ref = "lsqyoscrahjlxnjiuytr";

const regions = ["sa-east-1", "us-east-1", "us-west-1", "eu-west-1", "eu-central-1"];

async function main() {
  for (const region of regions) {
    const url = `postgresql://postgres.${ref}:${password}@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
      const count = await prisma.user.count();
      console.log("OK", region, "users", count);
      console.log("URL", url.replace(password, "***"));
      return;
    } catch (e) {
      const err = e as Error;
      console.log("FAIL", region, err.message.split("\n")[0]);
    } finally {
      await prisma.$disconnect();
    }
  }
  console.log("No region worked");
}

main().catch(console.error);
