# Cómo cambiar las imágenes

Las fotos de servicios, entrenadores y galería ya no se suben como archivo:
se gestionan pegando un **link de imagen** (por ejemplo, copiando la
dirección de una foto desde Google Imágenes) en el campo correspondiente
del panel interno (`/admin/servicios`, `/admin/entrenadores`,
`/admin/galeria`). No hace falta tocar código ni subir archivos al servidor.

Esto es necesario porque el proyecto corre en Vercel, donde el sistema de
archivos de las funciones es de solo lectura: no se pueden guardar archivos
subidos desde el navegador de forma permanente. Un link externo evita ese
problema.

Los archivos que quedan en esta carpeta (`services/`, `trainers/`,
`gallery/`) son las fotos originales usadas mientras el sitio funcionaba con
subida de archivos local; ya no están conectadas a ningún dato activo y se
pueden borrar con seguridad.
