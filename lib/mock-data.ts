import { Rol } from "@prisma/client";

export const MOCK_USERS = [
  {
    id: "mock-admin-id",
    nombre: "Administrador Demo",
    documento: "00000001",
    email: "admin@demo.com",
    rol: Rol.ADMIN,
    activo: true,
  },
  {
    id: "mock-coach-id",
    nombre: "Coach Experto Demo",
    documento: "10000001",
    email: "coach@demo.com",
    rol: Rol.ENTRENADOR,
    activo: true,
  },
  {
    id: "mock-athlete-id",
    nombre: "Atleta Corredor Demo",
    documento: "20000001",
    email: "atleta@demo.com",
    rol: Rol.ATLETA,
    activo: true,
  }
];

export const MOCK_PLAN = {
  id: "mock-plan-id",
  objetivo: "Maratón Internacional 2026 (Demo)",
  duracionSemanas: 12,
  volumenSemanal: 45.5,
  activo: true,
  atletaId: "mock-athlete-id",
  entrenadorId: "mock-coach-id",
  createdAt: new Date(),
  atleta: MOCK_USERS[2],
  entrenador: MOCK_USERS[1],
  sesiones: []
};

export const MOCK_SESIONES = [
  {
    id: "s1",
    distancia: 5.2,
    tiempo: 28,
    nivelEsfuerzo: 4,
    fecha: new Date(Date.now() - 86400000 * 1), // Ayer
    atletaId: "mock-athlete-id",
    planId: "mock-plan-id",
    plan: MOCK_PLAN
  },
  {
    id: "s2",
    distancia: 10.0,
    tiempo: 55,
    nivelEsfuerzo: 7,
    fecha: new Date(Date.now() - 86400000 * 3), // Hace 3 días
    atletaId: "mock-athlete-id",
    planId: "mock-plan-id",
    plan: MOCK_PLAN
  },
  {
    id: "s3",
    distancia: 8.5,
    tiempo: 45,
    nivelEsfuerzo: 6,
    fecha: new Date(Date.now() - 86400000 * 5), // Hace 5 días
    atletaId: "mock-athlete-id",
    planId: "mock-plan-id",
    plan: MOCK_PLAN
  }
];

// Asignar sesiones al plan mock
MOCK_PLAN.sesiones = MOCK_SESIONES as any;

export const MOCK_ATLETAS_ASIGNADOS = [
  {
    ...MOCK_USERS[2],
    planesComoAtleta: [MOCK_PLAN],
    sesiones: [MOCK_SESIONES[0]]
  }
];

export const MOCK_ALL_USERS_ADMIN = [
  ...MOCK_USERS,
  {
    id: "user-4",
    nombre: "Juan Pérez",
    documento: "30000001",
    email: "juan@info.com",
    rol: Rol.ATLETA,
    activo: true,
    createdAt: new Date()
  },
  {
    id: "user-5",
    nombre: "Maria Garcia",
    documento: "30000002",
    email: "maria@info.com",
    rol: Rol.ENTRENADOR,
    activo: false,
    createdAt: new Date()
  }
];
