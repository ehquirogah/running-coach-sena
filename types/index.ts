import { Usuario, PlanEntrenamiento, SesionEntrenamiento, RutinaEntrenamiento, Rol } from "@prisma/client";

/**
 * Global Types derived from Prisma
 */

export type UsuarioPublico = Omit<Usuario, "password">;

export type PlanConRelaciones = PlanEntrenamiento & {
  atleta: UsuarioPublico;
  entrenador: UsuarioPublico;
  rutinas?: RutinaEntrenamiento[];
};

export type SesionConPlan = SesionEntrenamiento & {
  plan: PlanEntrenamiento;
  rutina?: RutinaEntrenamiento | null;
};

export type RutinaConRelaciones = RutinaEntrenamiento & {
  plan: PlanEntrenamiento & {
    atleta: UsuarioPublico;
    entrenador: UsuarioPublico;
  };
  sesion?: SesionEntrenamiento | null;
};

export interface ReporteProgreso {
  sesiones: SesionConPlan[];
  totalKm: number;
  promedioTiempo: number;
  promedioEsfuerzo: number;
  evolucion: { fecha: string; km: number; esfuerzo: number }[];
}

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export { Rol };
