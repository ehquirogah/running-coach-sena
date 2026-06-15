import { PrismaClient, Rol } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("Password123", 12);

  // 1. ADMIN
  const admin = await prisma.usuario.upsert({
    where: { documento: "00000001" },
    update: {},
    create: {
      nombre: "Super Administrador",
      documento: "00000001",
      email: "admin@runningcoach.com",
      password: passwordHash,
      edad: 30,
      rol: Rol.ADMIN,
    },
  });

  // 2. ENTRENADORES
  const coach1 = await prisma.usuario.upsert({
    where: { documento: "10000001" },
    update: {},
    create: {
      nombre: "Entrenador Elite",
      documento: "10000001",
      email: "coach1@runningcoach.com",
      password: passwordHash,
      edad: 35,
      rol: Rol.ENTRENADOR,
    },
  });

  const coach2 = await prisma.usuario.upsert({
    where: { documento: "10000002" },
    update: {},
    create: {
      nombre: "Coach Pro",
      documento: "10000002",
      email: "coach2@runningcoach.com",
      password: passwordHash,
      edad: 40,
      rol: Rol.ENTRENADOR,
    },
  });

  // 3. ATLETAS
  const atleta1 = await prisma.usuario.upsert({
    where: { documento: "20000001" },
    update: {},
    create: {
      nombre: "Atleta Veterano",
      documento: "20000001",
      email: "atleta1@gmail.com",
      password: passwordHash,
      edad: 25,
      rol: Rol.ATLETA,
    },
  });

  const atleta2 = await prisma.usuario.upsert({
    where: { documento: "20000002" },
    update: {},
    create: {
      nombre: "Atleta Juvenil",
      documento: "20000002",
      email: "atleta2@gmail.com",
      password: passwordHash,
      edad: 11, // RN-002: mayor de 10
      rol: Rol.ATLETA,
    },
  });

  const atleta3 = await prisma.usuario.upsert({
    where: { documento: "20000003" },
    update: {},
    create: {
      nombre: "Corredor Casual",
      documento: "20000003",
      email: "atleta3@gmail.com",
      password: passwordHash,
      edad: 28,
      rol: Rol.ATLETA,
    },
  });

  const atleta4 = await prisma.usuario.upsert({
    where: { documento: "20000004" },
    update: {},
    create: {
      nombre: "Maratonista",
      documento: "20000004",
      email: "atleta4@gmail.com",
      password: passwordHash,
      edad: 32,
      rol: Rol.ATLETA,
    },
  });

  // 4. PLANES ACTIVOS (RN-003: solo 1 activo)
  const plan1 = await prisma.planEntrenamiento.create({
    data: {
      objetivo: "Maratón Valencia 2026",
      duracionSemanas: 16,
      volumenSemanal: 60.5,
      activo: true,
      atletaId: atleta1.id,
      entrenadorId: coach1.id,
    },
  });

  const plan2 = await prisma.planEntrenamiento.create({
    data: {
      objetivo: "Iniciación 5km",
      duracionSemanas: 8,
      volumenSemanal: 20.0,
      activo: true,
      atletaId: atleta2.id,
      entrenadorId: coach2.id,
    },
  });

  // 5. SESIONES (6 distribuidas)
  const sesionesData = [
    { atletaId: atleta1.id, planId: plan1.id, distancia: 10, tiempo: 50, nivelEsfuerzo: 6, fecha: new Date("2026-04-01") },
    { atletaId: atleta1.id, planId: plan1.id, distancia: 15, tiempo: 75, nivelEsfuerzo: 7, fecha: new Date("2026-04-03") },
    { atletaId: atleta1.id, planId: plan1.id, distancia: 8, tiempo: 40, nivelEsfuerzo: 5, fecha: new Date("2026-04-05") },
    { atletaId: atleta2.id, planId: plan2.id, distancia: 3, tiempo: 18, nivelEsfuerzo: 4, fecha: new Date("2026-04-02") },
    { atletaId: atleta2.id, planId: plan2.id, distancia: 5, tiempo: 30, nivelEsfuerzo: 6, fecha: new Date("2026-04-04") },
    { atletaId: atleta2.id, planId: plan2.id, distancia: 4, tiempo: 22, nivelEsfuerzo: 5, fecha: new Date("2026-04-06") },
  ];

  for (const sesion of sesionesData) {
    await prisma.sesionEntrenamiento.create({ data: sesion });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
