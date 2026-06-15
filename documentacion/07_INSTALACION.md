# 07. Instalación y Configuración del Entorno

Sigue estos pasos para poner en marcha el proyecto **Running Coach** en tu entorno local de desarrollo.

---

## 📋 Requisitos Previos
- **Node.js:** Versión 18 o superior instalada.
- **npm** o **pnpm/yarn** como gestor de paquetes.
- **Supabase Account:** Un proyecto creado en Supabase para obtener la URL de conexión de PostgreSQL.

---

## 🚀 Pasos para la Instalación

### 1. Clonar y Preparar Dependencias
Asegúrate de estar en la carpeta raíz del proyecto y ejecuta:
```bash
npm install
```

### 2. Configuración de Variables de Entorno
Crea un archivo llamado `.env.local` en la raíz (toma como base el ejemplo de abajo) y ajusta los valores de tu base de datos:

```env
# Conexión a Base de Datos (URL de Supabase)
# Ejemplo: postgresql://postgres:[password]@db.[id].supabase.co:5432/postgres
DATABASE_URL="postgresql://USUARIO:PASSWORD@HOST:PUERTO/postgres"

# Configuración de Autenticación
NEXTAUTH_SECRET="un_secreto_muy_seguro_y_largo"
NEXTAUTH_URL="http://localhost:3000"

# Opcional: URL de la aplicación para redirects
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Sincronizar Base de Datos (Prisma)
Para crear las tablas en tu proyecto de Supabase según el modelo definido:
```bash
npx prisma db push
```

### 4. Poblar Datos Iniciales (Seed)
Para tener usuarios de prueba reales en la base de datos:
```bash
npx prisma db seed
```

### 5. Iniciar en Desarrollo
Ejecuta el servidor con soporte para Turbopack para una velocidad óptima:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

---

## 🛠️ Comandos Útiles de Mantenimiento

### Abrir Interfaz Gráfica de Base de Datos
Prisma incluye una herramienta visual para ver y editar registros:
```bash
npx prisma studio
```

### Regenerar el Cliente Prisma
Si realizas cambios en `schema.prisma`:
```bash
npx prisma generate
```

---

## ❓ Solución de Problemas Comunes

**1. Error: "Can't reach database server"**
- Verifica que MySQL esté encendido.
- Confirma que el puerto configurado en `DATABASE_URL` sea el mismo que usa tu servidor local (típicamente 3306).

**2. Error: "Invalid nextauth_secret"**
- Asegúrate de haber definido el secreto en tu archivo `.env.local`.

---

[Anterior: Modo Demo](./06_MODO_DEMO.md) | [Inicio: Introducción](./01_INTRODUCCION.md)
