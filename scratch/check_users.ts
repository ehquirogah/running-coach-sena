import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking users in database...");
  try {
    const users = await prisma.usuario.findMany({
      select: {
        documento: true,
        rol: true,
        email: true,
      }
    });
    
    if (users.length === 0) {
      console.log("RESULT: No users found in the database. You MUST run 'npx prisma db seed'.");
    } else {
      console.log("RESULT: Found users:");
      console.table(users);
    }
  } catch (err) {
    console.error("RESULT: Error connecting to database. Is MySQL running?");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
