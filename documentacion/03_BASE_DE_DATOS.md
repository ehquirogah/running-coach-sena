# 03. Modelo de Datos y Persistencia

## 📊 Descripción del Modelo
La base de datos está diseñada de forma relacional para garantizar la integridad de la información y permitir consultas eficientes sobre el rendimiento de los atletas.

### Entidades Principales
1.  **Usuario:** Almacena la identidad de todas las personas en el sistema. Categorizado por Roles.
2.  **Plan de Entrenamiento:** Define los objetivos y la estructura de trabajo asignada por un Entrenador a un Atleta.
3.  **Sesión de Entrenamiento:** Representa una actividad física real ejecutada por el Atleta y vinculada a un Plan.

---

## 🛠️ Esquema Prisma (Modelos Detallados)

### Usuario (`Usuario`)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `String` | Identificador único (CUID). |
| `nombre` | `String` | Nombre completo del usuario. |
| `documento` | `String` | Documento de identidad (Único). |
| `email` | `String` | Correo electrónico (Único). |
| `password` | `String` | Hash de la contraseña (Bcrypt). |
| `edad` | `Int` | Edad (Validación RN-002: > 10). |
| `rol` | `Enum` | [ATLETA, ENTRENADOR, ADMIN]. |
| `activo` | `Boolean` | Estado del usuario en el sistema. |

### Plan de Entrenamiento (`PlanEntrenamiento`)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `String` | Identificador único. |
| `objetivo` | `String` | Meta del plan (ej: "Maratón"). |
| `volumen` | `Float` | Kilómetros totales/semanales. |
| `activo` | `Boolean` | RN-003: Solo un plan activo por atleta. |
| `atletaId` | `String` | Relación con el Atleta. |
| `entrenadorId` | `String` | Relación con el Entrenador. |

### Sesión de Entrenamiento (`SesionEntrenamiento`)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `distancia` | `Float` | Km recorridos en la sesión. |
| `tiempo` | `Float` | Duración en minutos. |
| `nivelEsfuerzo`| `Int` | RN-004: Escala del 1 al 10. |
| `fecha` | `DateTime` | Momento de la actividad. |

---

## 🔗 Relaciones (ER)
- **Atleta ←→ Plan:** Relación 1:N (Un atleta puede tener muchos planes históricos, pero solo uno activo).
- **Entrenador ←→ Plan:** Relación 1:N (Un entrenador crea y supervisa múltiples planes).
- **Plan ←→ Sesión:** Relación 1:N (Un plan agrupa múltiples sesiones de entrenamiento diario).
- **Atleta ←→ Sesión:** Relación 1:N (Conexión directa para reportes históricos e individuales).

---

## ⚡ Por qué usamos Supabase (PostgreSQL)
La elección de Supabase como proveedor de base de datos no es casual; responde a necesidades específicas de rendimiento y escalabilidad:

1.  **Potencia de PostgreSQL:** A diferencia de otros motores, PostgreSQL ofrece una robustez superior para relaciones complejas y una integridad de datos inigualable.
2.  **Arquitectura Serverless:** Supabase está optimizado para funcionar con frameworks modernos como Next.js, reduciendo la latencia y eliminando la necesidad de gestionar manualmente servidores físicos.
3.  **Escalabilidad Transparente:** Permite que el proyecto pase de una etapa inicial de desarrollo a una producción masiva con miles de Atletas y Entrenadores sin cambiar una sola línea de código SQL.
4.  **Ecosistema de Herramientas:** Facilita la gestión de migraciones, backups automáticos y monitoreo de rendimiento desde un panel centralizado.
5.  **Integración con Prisma:** La compatibilidad nativa entre Prisma y PostgreSQL permite un tipado fuerte de extremo a extremo, minimizando errores en tiempo de ejecución.

---

## 🏗️ Integridad de Datos
El sistema utiliza **Prisma Middleware** y validaciones a nivel de base de datos para asegurar que:
- No existan documentos duplicados.
- Se mantenga la integridad referencial al eliminar usuarios o planes.
- Los tipos de datos (Float para Km, Int para Esfuerzo) sean consistentes.

---

[Anterior: Arquitectura](./02_ARQUITECTURA.md) | [Siguiente: Lógica de Negocio](./04_LOGICA_DE_NEGOCIO.md)
