# 🇪🇸 Asesor Administrativo España

Una aplicación web moderna construida con **Next.js 15** y **JavaScript** que ayuda a los usuarios a resolver sus trámites administrativos en España utilizando inteligencia artificial.

## ✨ Características

- 🎨 Diseño moderno con **Tailwind CSS**
- 📱 Completamente responsive
- 🗂️ 4 áreas de trámites: Consulados, SEPE, Seguridad Social y Hacienda
- 💾 Base de datos PostgreSQL con **Prisma ORM**
- ☁️ Compatible con **Neon.tech** (Database as a Service)
- 🤖 Preparado para integración con IA

## 🚀 Tecnologías

- **Next.js 15** (App Router)
- **JavaScript** (sin TypeScript)
- **Tailwind CSS**
- **Prisma ORM**
- **PostgreSQL** (Neon.tech)
- **React 19**

## 📁 Estructura del Proyecto

```
web_administrativa_alex/
├── app/
│   ├── layout.js              # Layout principal con Navbar y Footer
│   ├── page.js                # Página de inicio con tarjetas de trámites
│   └── tramite/
│       └── [slug]/
│           └── page.js        # Página dinámica de cada trámite
├── components/
│   ├── Navbar.jsx             # Barra de navegación
│   ├── Footer.jsx             # Pie de página
│   └── TramiteCard.jsx        # Tarjeta de trámite
├── lib/
│   └── prisma.js              # Cliente de Prisma (singleton)
├── prisma/
│   ├── schema.prisma          # Schema de la base de datos
│   └── seed.js                # Script para insertar datos iniciales
├── .env                       # Variables de entorno (configurar aquí Neon.tech)
├── package.json
└── README.md
```

## 📋 Prerequisitos

- **Node.js** 18.x o superior
- **npm** o **yarn**
- Una cuenta en **[Neon.tech](https://neon.tech)** (gratis)

## ⚙️ Configuración

### 1️⃣ Clonar o descargar el proyecto

Si ya tienes el proyecto, navega a la carpeta:

```bash
cd web_administrativa_alex
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar la base de datos (Neon.tech)

1. Ve a [https://neon.tech](https://neon.tech) y crea una cuenta (si no tienes una)
2. Crea un nuevo proyecto en Neon
3. Copia la **Connection String** (cadena de conexión) de PostgreSQL
4. Abre el archivo `.env` en la raíz del proyecto
5. Reemplaza la línea `DATABASE_URL` con tu cadena de conexión:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

**Ejemplo:**
```env
DATABASE_URL="postgresql://neondb_owner:ABC123xyz@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### 4️⃣ Crear las tablas en la base de datos

Ejecuta este comando para sincronizar el schema de Prisma con tu base de datos:

```bash
npx prisma db push
```

### 5️⃣ Generar el cliente de Prisma

```bash
npx prisma generate
```

### 6️⃣ Insertar datos iniciales (seed)

Para poblar la base de datos con los 4 trámites iniciales:

```bash
node prisma/seed.js
```

Deberías ver algo como:
```
🌱 Iniciando seed de la base de datos...
📝 Insertando trámites...
✅ Trámite creado/actualizado: Consulados (consulados)
✅ Trámite creado/actualizado: SEPE (sepe)
✅ Trámite creado/actualizado: Seguridad Social (seguridad-social)
✅ Trámite creado/actualizado: Hacienda (hacienda)
✨ Seed completado exitosamente!
```

## 🏃 Ejecutar el proyecto

### Modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Modo producción

```bash
npm run build
npm start
```

## 🗄️ Schema de la Base de Datos

### Modelo: **Tramite**

```prisma
model Tramite {
  id          Int      @id @default(autoincrement())
  nombre      String
  slug        String   @unique
  descripcion String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Modelo: **Consulta**

```prisma
model Consulta {
  id              Int      @id @default(autoincrement())
  mensajeUsuario  String   @db.Text
  respuestaIA     String?  @db.Text
  timestamp       DateTime @default(now())
}
```

## 📝 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Crea la build de producción |
| `npm start` | Inicia el servidor de producción |
| `npx prisma db push` | Sincroniza el schema con la base de datos |
| `npx prisma generate` | Genera el cliente de Prisma |
| `npx prisma studio` | Abre la interfaz visual de la base de datos |
| `node prisma/seed.js` | Ejecuta el script de seed |

## 🎨 Características de Diseño

- ✅ **Gradientes vibrantes** en hero sections y componentes
- ✅ **Glassmorphism** en elementos destacados
- ✅ **Animaciones suaves** en hover y transiciones
- ✅ **Iconos SVG** personalizados
- ✅ **Layout responsive** para mobile, tablet y desktop
- ✅ **Colores temáticos** profesionales (azul, índigo, púrpura)

## 🔧 Próximos Pasos (Sugerencias)

1. **Integrar IA**: Conectar el formulario de consultas con una API de IA (OpenAI, Claude, etc.)
2. **Autenticación**: Añadir login de usuarios con NextAuth.js
3. **Panel de Admin**: Crear área administrativa para gestionar trámites
4. **Búsqueda**: Implementar buscador de trámites
5. **Multiidioma**: Soporte para español, inglés, etc.
6. **Analytics**: Integrar Google Analytics o similar

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para ayudar a resolver trámites administrativos en España.

---

**¿Preguntas o problemas?** Crea un issue en el repositorio.
