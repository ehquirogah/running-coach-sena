# 08. Rutinas, Retroalimentacion y Proyeccion Deportiva

## Objetivo
Este modulo permite que el entrenador diseñe rutinas concretas dentro del plan activo de un atleta, revise el resultado reportado por el atleta y use esa informacion para proyectar nuevas actividades o ajustes del plan deportivo.

## Flujo Principal
1. El entrenador crea un plan activo para un atleta.
2. Desde el detalle del atleta, el entrenador asigna rutinas con fecha, distancia, tiempo, intensidad, tipo de entrenamiento y observaciones tecnicas.
3. El atleta consulta sus rutinas en `Mi Plan` y registra el resultado del entrenamiento.
4. El sistema vincula el resultado con una sesion de entrenamiento y cambia la rutina a `COMPLETADA`.
5. El entrenador revisa la retroalimentacion del atleta y agrega feedback tecnico, recomendacion y decision de ajuste.
6. La rutina pasa a `REVISADA` y queda disponible para el historial y la proyeccion.

## Modulos Del Entrenador
- **Detalle del atleta:** crea rutinas, consulta resultados por rutina y retroalimenta entrenamientos completados.
- **Historial de entrenamientos:** muestra sesiones realizadas por los atletas del entrenador, diferenciando sesiones libres y rutinas asignadas.
- **Proyeccion deportiva:** resume el avance de cada plan activo, kilometros de la semana, cumplimiento del volumen, rutinas pendientes, rutinas por revisar y una recomendacion operativa para el entrenador.

## Modulos Del Atleta
- **Mi Plan:** muestra rutinas asignadas, estado de cada rutina y retroalimentacion recibida.
- **Registro de resultado:** permite reportar distancia, tiempo, esfuerzo, cumplimiento, dificultad real, comentarios, molestias y evidencia textual.
- **Historial de sesiones:** conserva compatibilidad con entrenamientos libres y entrenamientos asociados a rutinas.

## Estados De Rutina
- `PENDIENTE`: rutina asignada por el entrenador y aun no reportada por el atleta.
- `COMPLETADA`: el atleta registro el resultado y queda lista para revision.
- `REVISADA`: el entrenador envio retroalimentacion.
- `CANCELADA`: estado reservado para futuras reglas de anulacion.

## Criterios De Aceptacion
- Solo entrenadores pueden crear rutinas y retroalimentar rutinas de sus propios planes.
- Solo atletas pueden registrar resultados de rutinas asignadas a su plan activo.
- El entrenador puede consultar el historial de entrenamientos realizados por sus atletas.
- El modulo de proyeccion muestra proximas actividades y alertas de revision o ajuste.
- Las sesiones existentes sin rutina siguen funcionando como entrenamientos libres.
