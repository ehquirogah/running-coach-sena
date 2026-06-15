-- CreateEnum
CREATE TYPE "EstadoRutina" AS ENUM ('PENDIENTE', 'COMPLETADA', 'REVISADA', 'CANCELADA');

-- AlterTable
ALTER TABLE "sesion_entrenamiento" ADD COLUMN "rutinaId" TEXT;

-- CreateTable
CREATE TABLE "rutina_entrenamiento" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipoEntrenamiento" TEXT NOT NULL,
    "fechaProgramada" TIMESTAMP(3) NOT NULL,
    "distanciaObjetivo" DOUBLE PRECISION NOT NULL,
    "tiempoObjetivo" DOUBLE PRECISION NOT NULL,
    "intensidadEsperada" INTEGER NOT NULL,
    "observacionesEntrenador" TEXT,
    "estado" "EstadoRutina" NOT NULL DEFAULT 'PENDIENTE',
    "resultadoPercibido" TEXT,
    "cumplimiento" INTEGER,
    "comentariosAtleta" TEXT,
    "molestiasFisicas" TEXT,
    "dificultadReal" INTEGER,
    "evidencia" TEXT,
    "feedbackEntrenador" TEXT,
    "recomendacionEntrenador" TEXT,
    "decisionAjuste" TEXT,
    "completadaAt" TIMESTAMP(3),
    "revisadaAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rutina_entrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sesion_entrenamiento_rutinaId_key" ON "sesion_entrenamiento"("rutinaId");

-- AddForeignKey
ALTER TABLE "rutina_entrenamiento" ADD CONSTRAINT "rutina_entrenamiento_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan_entrenamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesion_entrenamiento" ADD CONSTRAINT "sesion_entrenamiento_rutinaId_fkey" FOREIGN KEY ("rutinaId") REFERENCES "rutina_entrenamiento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
