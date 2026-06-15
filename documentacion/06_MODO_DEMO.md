# 06. Modo Demo y Sistema de Mocks

## 🧩 ¿Qué es el Modo Demo?
El **Modo Demo** es una funcionalidad avanzada de **Running Coach** diseñada para permitir la exploración total de la plataforma sin necesidad de una conexión activa a una base de datos MySQL. Esto es ideal para presentaciones rápidas, pruebas de interfaz (UI Testing) y demostraciones donde la infraestructura no está disponible.

---

## ⚙️ Cómo Funciona

### 1. Bypass de Autenticación
El sistema intercepta las credenciales en `lib/auth.ts`. Si detecta documentos específicos asignados como "Demo", permite el acceso devolviendo un objeto de sesión válido sin consultar la base de datos real.

**Credenciales de Acceso:**
- **Admin:** Documento `00000001` / Pass `Password123`
- **Coach:** Documento `10000001` / Pass `Password123`
- **Atleta:** Documento `20000001` / Pass `Password123`

### 2. Capa de Datos Fallback (Mock Data)
Todas las acciones del servidor (`Server Actions`) han sido modificadas con una estructura de `try/catch`.
- **Intento:** Se intenta consultar Prisma.
- **Fallo:** Si ocurre un error de conexión (P2002, ECONNREFUSED), el sistema captura el error y devuelve datos desde `lib/mock-data.ts` en lugar de fallar (500).

---

## 📦 Datos Incluidos en el Mock
- **Atletas:** Usuarios ficticios con roles y estados activos.
- **Planes:** Plan de Maratón vigente con objetivos y volumen de carga.
- **Sesiones:** Historial de carreras con distancias, tiempos y niveles de esfuerzo variados para generar gráficas dinámicas.

---

## ⚠️ Consideraciones Importantes
1.  **Persistencia Volátil:** Los cambios realizados en Modo Demo (ej: crear un plan nuevo o registrar una carrera) se verán reflejados visualmente pero **no se guardarán**. Al refrescar la página, los datos volverán a su estado inicial definido en el archivo mock.
2.  **Transición a Producción:** Para desactivar el Modo Demo, simplemente debe iniciar su servidor MySQL y poblar la base de datos real con `npx prisma db seed`. El código priorizará siempre la conexión real si esta existe y tiene datos.

---

[Anterior: Guías de Usuario](./05_GUIAS_USUARIO.md) | [Siguiente: Instalación](./07_INSTALACION.md)
