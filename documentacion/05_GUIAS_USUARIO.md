# 05. Guias de Usuario por Roles

Running Coach es una plataforma multi-rol. Cada usuario tiene una experiencia personalizada segun sus necesidades.

---

## Portal del Atleta
El portal del atleta esta disenado para consultar su plan, ejecutar rutinas y registrar resultados de entrenamiento.

### 1. Dashboard Principal
- **Resumen de metricas:** visualiza kilometros recorridos, sesiones realizadas y nivel de esfuerzo promedio.
- **Plan actual:** acceso directo al objetivo del plan activo y al entrenador asignado.

### 2. Rutinas Asignadas
- En `Mi Plan`, el atleta consulta las rutinas creadas por su entrenador dentro del plan activo.
- Cada rutina muestra fecha, tipo de entrenamiento, distancia objetivo, tiempo objetivo, intensidad esperada y observaciones tecnicas.
- El atleta puede registrar resultado, cumplimiento, dificultad real, comentarios, molestias fisicas y evidencia textual.
- Cuando el entrenador revisa la rutina, el atleta puede consultar la retroalimentacion y recomendacion tecnica recibida.

### 3. Registro de Sesiones
- El atleta puede registrar sesiones libres con `Distancia (Km)`, `Tiempo (min)`, `Nivel de Esfuerzo` y `Fecha`.
- Si la sesion corresponde a una rutina asignada, el sistema vincula el resultado con esa rutina.
- La escala de esfuerzo se mantiene entre 1 y 10.

### 4. Reportes Visuales
- Graficas evolutivas muestran la progresion de distancia y esfuerzo a lo largo del tiempo.
- Los reportes diferencian entrenamientos libres y entrenamientos asociados a rutinas.

---

## Portal del Entrenador
El entrenador gestiona atletas, planes, rutinas, retroalimentacion y proyeccion deportiva.

### 1. Gestion de Atletas
- **Lista de atletas:** vista general de corredores asignados y ultima actividad realizada.
- **Detalle de atleta:** muestra informacion del atleta, plan activo, historial de sesiones y rutinas del plan.

### 2. Creacion de Planes
- El entrenador puede asignar planes especificos definiendo:
  - **Objetivo:** por ejemplo, mejorar marca en 10K.
  - **Duracion:** numero de semanas.
  - **Carga:** volumen semanal recomendado en kilometros.
- Se conserva la regla de negocio de un solo plan activo por atleta.

### 3. Rutinas y Retroalimentacion
- Desde el detalle de un atleta con plan activo, el entrenador crea rutinas concretas con fecha, tipo, distancia, tiempo e intensidad esperada.
- El atleta registra el resultado de la rutina y el sistema cambia su estado a `COMPLETADA`.
- El entrenador revisa resultado, cumplimiento, esfuerzo, molestias y comentarios del atleta.
- Luego agrega feedback tecnico, recomendacion y decision de ajuste; la rutina pasa a `REVISADA`.

### 4. Historial de Entrenamientos
- En `/historial`, el entrenador consulta entrenamientos realizados por sus atletas.
- La tabla diferencia sesiones libres y rutinas asignadas.
- Tambien muestra si la rutina ya fue revisada o si tiene feedback pendiente.

### 5. Proyeccion Deportiva
- En `/proyeccion`, el entrenador consulta avance de planes activos, volumen semanal, cumplimiento, rutinas pendientes y rutinas por revisar.
- El sistema muestra una recomendacion operativa para decidir si mantener carga, bajar intensidad, revisar resultados o crear nuevas rutinas.
- Esta vista sirve como apoyo para disenar nuevos ejercicios y ajustar el siguiente bloque del plan.

---

## Portal del Administrador
El administrador garantiza el orden y la seguridad del ecosistema.

### 1. Control de Usuarios
- **Directorio global:** lista de entrenadores y atletas.
- **Estado de cuenta:** el administrador puede activar o desactivar usuarios.
- **Roles:** permite verificar que cada usuario tenga el acceso correcto a sus rutas protegidas.

---

## Seguridad y Acceso
- El sistema utiliza middleware de rutas para redirigir usuarios que intenten ingresar a rutas que no corresponden a su rol.
- Solo `ENTRENADOR` puede crear rutinas y retroalimentar resultados de sus propios planes.
- Solo `ATLETA` puede registrar resultados de rutinas asignadas a su plan activo.

---

[Anterior: Logica de Negocio](./04_LOGICA_DE_NEGOCIO.md) | [Siguiente: Modo Demo](./06_MODO_DEMO.md)
