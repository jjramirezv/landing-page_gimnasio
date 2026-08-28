# Power Fitness Gym — Requisitos

Versión 2 — 20/08/26 (actualizado en base a "Correcciones gimnasio angely.pdf", versión 1 del 18/08/26)

## Parte 1 — Landing page (completada)

| # | Corrección solicitada | Estado | Detalle de la implementación |
|---|---|---|---|
| 1 | Mejorar el apartado de Membresías: que los botones estén de manera adecuada | Hecho | El selector Mensual/Anual y la etiqueta "Ahorra 20%" ahora usan un layout flexible que se acomoda sin solaparse en pantallas pequeñas; el badge "Más Popular" quedó por encima del resto de elementos (z-index) y ya no corta texto. |
| 2 | Agregar segmentación de usuarios | Hecho | Nueva sección "¿Es Power Fitness para Ti?" con tabla de 6 segmentos (Principiante, Deportista experimentado, Profesional con poco tiempo, Estudiante, Adulto mayor/rehabilitación, Empresa/corporativo), cada uno con descripción, necesidad principal y acción esperada. |
| 3 | Cambiar la gama de colores para que combine con un gimnasio y reducir el tamaño de texto | Hecho | Paleta cambiada de naranja/rosa sobre azul marino a verde lima/negro (más asociada a energía y deporte), manteniendo buen contraste de texto sobre los nuevos fondos claros. Los títulos de sección se redujeron un nivel de tamaño (de 3xl–5xl a 2xl–4xl) y el titular principal del hero de 4xl–7xl a 3xl–6xl para que el contenido no se corte. |
| 4 | Colocar íconos reales de redes sociales | Hecho | Se reemplazaron los textos "f / ig / tt / yt" por íconos SVG reales de Facebook, Instagram, TikTok y YouTube en el pie de página y en las tarjetas de entrenadores. |
| 5 | Actualizar el documento de requerimientos | Hecho | Este documento. |

**Pendiente antes de avanzar:** confirmar por el grupo de WhatsApp que la Parte 1 fue aprobada antes de iniciar la Parte 2.

## Parte 2 — Sistema de roles y panel interno (pendiente de aprobación para iniciar)

La landing deberá incorporar un sistema de inicio de sesión con tres niveles de acceso:

- **Visitantes**: navegan libremente (servicios, planes, entrenadores, horarios, contacto), sin necesidad de cuenta.
- **Usuarios registrados (socios)**: inician sesión para ver su membresía, clases reservadas, recordatorios y notificaciones.
- **Personal autorizado**: accede a una opción visible solo para ellos ("Administrar gimnasio" / "Panel interno").

### Panel interno — funcionalidades requeridas

- CRUD de planes (nombre, descripción, precio, duración, beneficios, estado de publicación).
- CRUD de servicios (musculación, clases grupales, funcional, personal training, nutrición, etc.).
- CRUD de entrenadores (nombre, especialidad, foto, horarios, descripción).
- Gestión de galería de imágenes y videos sin tocar código.
- Gestión de formularios de contacto y leads.
- Dashboard con socios activos, nuevos leads, clases programadas, correos enviados y actividad reciente.
- Mini inventario interno (producto, stock disponible, stock mínimo, estado, última actualización) con alerta automática de stock bajo.
- Integración con Gmail para correos automáticos: producto por agotarse, nuevo registro, membresía por vencer, clase próxima a comenzar. El panel debe mostrar el estado de la conexión y el historial de correos (enviados / programados / fallidos).
- Plantillas de correo configurables: bienvenida, recordatorio de clase, vencimiento de membresía, promociones, alerta de stock bajo.
- Roles y permisos: Administrador, Recepción, Entrenador, Usuario.
- Recuperación de contraseña, cierre de sesión, protección de rutas privadas, control de acceso por permisos.
- Historial básico de cambios (usuario y fecha).
- Diseño intuitivo, sin necesidad de conocimientos técnicos para el personal del gimnasio.
- Arquitectura reutilizable, pensada para adaptarse a otros tipos de landing con panel interno.
- 100% responsive (laptop, tablet, celular).

### Notas de alcance

Este bloque no se inicia hasta recibir confirmación explícita por WhatsApp, tal como se indicó en el documento de correcciones original. Implica autenticación, base de datos, roles/permisos y un panel administrativo completo — es un desarrollo considerablemente mayor que la landing pública y conviene dimensionarlo (tiempo/alcance) antes de comenzar.
