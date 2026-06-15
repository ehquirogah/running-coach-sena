# AGENTS.md: Convenciones de Running Coach

## Contexto del proyecto
Running Coach es una plataforma web para planificación y análisis de entrenamientos de corredores. Tiene tres actores: Atleta, Entrenador y Administrador con permisos diferenciados.

## Reglas de negocio críticas (NO OLVIDAR)
- **RN-001**: contraseña mínimo 8 caracteres, letras y números.
- **RN-002**: atleta debe ser mayor de 10 años para registrarse.
- **RN-003**: un atleta solo puede tener UN plan de entrenamiento activo.
- **RN-004**: el rol define los permisos (ATLETA / ENTRENADOR / ADMIN).

## Roles y rutas protegidas
- **ATLETA**: `/dashboard/atleta`, `/sesiones`, `/mi-plan`
- **ENTRENADOR**: `/dashboard/entrenador`, `/planes`, `/atletas`
- **ADMIN**: `/admin/usuarios`
- El middleware de Next.js 16.2 protege estas rutas verificando el rol en el JWT.

## Convenciones de código
- **Server Components** por defecto. `"use client"` solo para interactividad.
- **Server Actions** en `/actions/` con `"use server"` al inicio del archivo.
- **API Routes** en `/app/api/` retornando `NextResponse.json()` con status correcto.
- **Zod** valida TODOS los inputs antes de tocar la base de datos.
- **Prisma** singleton en `lib/prisma.ts` con `globalThis` para Turbopack Fast Refresh.
- **Recharts** para todas las gráficas de reportes (no usar otras librías).
- **Tailwind CSS v4** únicamente. Paleta: verde atletismo `#16A34A`, blanco, gris.

## Estructura de rutas
`app/`
├── `(auth)/login`, `/registro`
├── `(atleta)/dashboard`, `/sesiones/nueva`, `/sesiones/historial`, `/mi-plan`
├── `(entrenador)/dashboard`, `/planes/nuevo`, `/atletas`, `/atletas/[id]`
├── `(admin)/usuarios`
├── `/reportes/[atletaId]`
└── `api/` → usuarios, planes, sesiones, reportes

## Comandos frecuentes
- `npm run dev`           → servidor con Turbopack
- `npx prisma studio`     → explorador visual BD
- `npx prisma migrate dev --name [nombre]`
- `npx prisma db seed`
