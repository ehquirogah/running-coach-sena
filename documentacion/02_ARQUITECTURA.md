# 02. Arquitectura Técnica

## 💻 Tech Stack (Estructura Tecnológica)
El sistema está construido sobre tecnologías de vanguardia que garantizan escalabilidad, mantenibilidad y seguridad.

### Core Framework
- **Next.js 16.2:** Utilizando el **App Router** para navegación optimizada y Server Components para mayor velocidad.
- **Turbopack:** Motor de compilación incremental que acelera el tiempo de desarrollo.

### Persistencia y Datos
- **Prisma ORM:** Capa de abstracción para la base de datos que permite tipado fuerte en TypeScript.
- **Supabase (PostgreSQL):** Motor de base de datos relacional y plataforma de backend gestionada para la persistencia de usuarios, planes y sesiones.

### Seguridad y Autenticación
- **Auth.js v5 (NextAuth):** Implementación de autenticación basada en JWT.
- **Bcrypt.js:** Algoritmo de hashing para el almacenamiento seguro de contraseñas.

### UI/UX y Estilo
- **Tailwind CSS:** Framework de utilidades para un diseño moderno y altamente personalizable.
- **Lucide React:** Set de iconos minimalistas y consistentes.
- **Clsx & Tailwind-Merge:** Utilidades para el manejo dinámico de clases CSS.

---

## 📂 Estructura del Proyecto
```text
running-coach/
├── actions/            # Server Actions para lógica de negocio (CRUD)
├── app/                # App Router con Route Groups por roles
│   ├── (admin)/        # Rutas protegidas para Administradores
│   ├── (atleta)/       # Rutas protegidas para Atletas
│   ├── (entrenador)/   # Rutas protegidas para Entrenadores
│   ├── (auth)/         # Login y Registro
│   └── api/            # Endpoints API REST internos
├── components/         # Componentes UI reutilizables
│   ├── ui/             # Componentes base (Botones, Cards, Inputs)
│   ├── layout/         # Navbar, Footer, Sidebar
│   └── [modulo]/        # Componentes específicos de cada portal
├── lib/                # Utilidades, configuración de Prisma y Auth
├── prisma/             # Schema de base de datos y scripts de seed
├── public/             # Assets estáticos (imágenes, fuentes)
└── types/              # Definiciones globales de TypeScript
```

---

## 🎨 Principios de Diseño
### 1. Route Groups
Se utiliza la convención `(folder_name)` en la carpeta `app` para separar las capas visuales por roles sin afectar la estructura de la URL. Esto permite tener layouts específicos para cada portal.

### 2. Server Actions
Toda la lógica de mutación de datos se maneja mediante Server Actions, lo que reduce la necesidad de APIs externas y mejora la seguridad al ejecutarse exclusivamente en el servidor.

### 3. Design System (Metric Cards)
Se ha implementado un sistema de "Cartas de Métricas" unificado que utiliza `label` y `value` para mostrar información crítica (Km, Tiempo, Esfuerzo) de forma consistente en todos los dashboards.

---

[Anterior: Introducción](./01_INTRODUCCION.md) | [Siguiente: Modelo de Datos](./03_BASE_DE_DATOS.md)
