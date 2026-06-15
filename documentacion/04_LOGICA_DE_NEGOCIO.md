# 04. Lógica de Negocio y Reglas del Sistema

Este documento detalla las restricciones técnicas y funcionales que garantizan el correcto funcionamiento del ecosistema **Running Coach**.

---

## 🛡️ Reglas de Negocio (RN)

### 📌 RN-001: Identidad Única
- Todo usuario debe registrarse con un **Documento de Identidad único** y un **Email único**.
- Las contraseñas se almacenan mediante hashing asíncrono (**Bcrypt**) con una sal de 10 rondas.
- El sistema impide el registro si cualquiera de estos campos ya existe en la base de datos.

### 📌 RN-002: Restricción de Edad
- El registro de atletas está limitado a personas con una **edad superior a 10 años**.
- Esta validación se realiza tanto en el Cliente (Zod) como en el Servidor (Server Action) para evitar inyecciones de datos inválidos.

### 📌 RN-003: Exclusividad de Plan Activo
- Un Atleta **solo puede tener un plan de entrenamiento activo** a la vez.
- Al intentar crear un nuevo plan para un atleta, el sistema verifica el estado de sus planes actuales.
- Si ya existe un plan activo, la creación se bloquea con un mensaje de error descriptivo indicando que debe finalizar el plan actual primero.

### 📌 RN-004: Escala de Esfuerzo Percibido
- El registro de sensaciones en las sesiones utiliza una escala numérica del **1 al 10**.
- Donde:
    - **1-3:** Esfuerzo liviano / Recuperación.
    - **4-6:** Esfuerzo moderado / Tempo.
    - **7-8:** Esfuerzo fuerte / Intervalos.
    - **9-10:** Esfuerzo máximo / Competición.

---

## ⚡ Servicios del Servidor (Server Actions)

### Gestión de Usuarios (`usuarioActions.ts`)
- `registrarUsuario`: Procesa el registro inicial aplicando RN-001 y RN-002.
- `obtenerUsuariosPaginados`: Permite al administrador listar usuarios de forma eficiente.
- `toggleUsuarioActivo`: Permite habilitar o deshabilitar cuentas en tiempo real (Audit Log implícito).

### Gestión de Planes (`planActions.ts`)
- `crearPlan`: Implementa RN-003 y vincula al entrenador con el atleta.
- `obtenerPlanActivoAtleta`: Recupera el plan vigente para mostrarlo en el dashboard del corredor.
- `obtenerPlanesDeEntrenador`: Lista los planes creados por el coach autenticado.

### Registro de Actividad (`sesionActions.ts`)
- `registrarSesion`: Aplica RN-004 y actualiza los indicadores de volumen del atleta.
- `obtenerHistorialSesiones`: Recupera las actividades anteriores con paginación integrada.

---

## 🔍 Validaciones (Zod Schemas)
Toda la entrada de datos está protegida por esquemas de validación centralizados en `lib/validations/`:
- **`usuarioSchema`:** Valida formatos de documento, email y fortaleza de contraseña.
- **`planSchema`:** Valida que el volumen sea un número positivo y que los campos de objetivo no estén vacíos.
- **`sesionSchema`:** Valida que la distancia y el tiempo sean realistas y que el esfuerzo esté en el rango 1-10.

---

[Anterior: Base de Datos](./03_BASE_DE_DATOS.md) | [Siguiente: Guías de Usuario](./05_GUIAS_USUARIO.md)
