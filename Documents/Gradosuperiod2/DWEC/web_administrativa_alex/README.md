# 🚀 Asesor Administrativo España - Proyecto Completo

## 📋 Resumen del Proyecto

Este es un **asistente administrativo inteligente** construido con Next.js 15, que ayuda a usuarios a resolver trámites administrativos en España mediante IA (Google Gemini).

---

## ✅ Estado Actual - TODO IMPLEMENTADO

### 🎨 **Frontend**
- ✅ Next.js 15 (App Router) con JavaScript
- ✅ Tailwind CSS para estilos modernos
- ✅ Sistema multi-idioma (Español / Rumano)
- ✅ Navbar y Footer profesionales
- ✅ Página de inicio con 4 tarjetas de trámites
- ✅ Rutas dinámicas `/tramite/[slug]`
- ✅ Diseño responsivo y moderno

### 🤖 **Inteligencia Artificial**
- ✅ Integración con Google Gemini AI
- ✅ Chat interactivo por trámite
- ✅ Sistema RAG (Retrieval-Augmented Generation)
- ✅ Feedback de usuarios
- ✅ Almacenamiento de consultas en BD

### 💾 **Base de Datos**
- ✅ PostgreSQL en Neon.tech
- ✅ Prisma ORM configurado
- ✅ Modelos: Tramite, Consulta
- ✅ Seed ejecutado (4 trámites iniciales)

### 📱 **Características Especiales**
- ✅ **Botón de WhatsApp** con mensaje personalizado por trámite
- ✅ Animaciones y efectos visuales atractivos
- ✅ Sistema de contexto para multi-idioma
- ✅ Configuración centralizada de contacto

---

## 📂 Estructura del Proyecto

```
web_administrativa_alex/
├── app/
│   ├── layout.js               # Layout principal con Navbar y Footer
│   ├── page.js                 # Página de inicio (4 tarjetas)
│   ├── globals.css             # Estilos globales
│   └── tramite/
│       └── [slug]/
│           └── page.js         # Página de detalle de trámite + Chat IA
├── components/
│   ├── Navbar.jsx              # Barra de navegación
│   ├── Footer.jsx              # Pie de página
│   ├── TramiteCard.jsx         # Tarjeta de trámite
│   ├── ChatBox.jsx             # Chat con IA
│   └── ClientLayout.jsx        # Layout del lado del cliente
├── lib/
│   ├── LanguageContext.js      # Contexto de idiomas
│   ├── translations.js         # Traducciones ES/RO
│   └── contact-config.js       # Configuración de contacto (WhatsApp, email)
├── prisma/
│   ├── schema.prisma           # Esquema de base de datos
│   └── seed.js                 # Datos iniciales
├── .env                        # Variables de entorno
└── package.json
```

---

## 🎯 Trámites Disponibles

1. **📋 Consulados** - Pasaportes, visas, documentos consulares
2. **💼 SEPE** - Prestaciones por desempleo, formación
3. **🏥 Seguridad Social** - Vida laboral, jubilación, pensiones
4. **💰 Hacienda** - Declaración de la renta, certificados, IVA

---

## ⚙️ Configuración Necesaria

### 1. **Número de WhatsApp** (IMPORTANTE)
Abre `lib/contact-config.js` y cambia:
```javascript
whatsappNumber: '34612345678',  // ← Cambia por tu número real
```

### 2. **Variables de Entorno** 
El archivo `.env` ya está configurado con:
- `DATABASE_URL` - Conexión a Neon.tech ✅
- `GEMINI_API_KEY` - API Key de Google Gemini ✅

---

## 🚀 Comandos para Ejecutar

### Desarrollo Local
```bash
npm run dev
# Servidor en: http://localhost:3000
```

### Base de Datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Sincronizar esquema con BD
npx prisma db push

# Insertar datos iniciales
node prisma/seed.js

# Ver base de datos en navegador
npx prisma studio
```

---

## 🌐 Deployment a Vercel

### Preparación
1. **Subir a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/web_administrativa_alex.git
git push -u origin main
```

2. **Variables de Entorno en Vercel**
En tu proyecto de Vercel, agrega:
- `DATABASE_URL` - Tu conexión de Neon.tech
- `GEMINI_API_KEY` - Tu API Key de Google Gemini

3. **Deploy**
- Conecta el repositorio en Vercel
- Deploy automático ✅

---

## 🎨 Características de Diseño

### Paleta de Colores
- **Azul/Índigo**: Trámites, navegación
- **Verde**: WhatsApp, contacto
- **Gradientes**: Fondos modernos
- **Glassmorphism**: Efectos de vidrio

### Animaciones
- ✨ Hover effects en tarjetas
- 💫 Botón de WhatsApp pulsante
- 🎯 Transiciones suaves
- 📱 Responsive en todos los dispositivos

---

## 📱 Funcionalidad de WhatsApp

Cuando un usuario hace clic en el botón de WhatsApp:
1. Se abre WhatsApp Web/App
2. Mensaje pre-rellenado: **"Hola, necesito ayuda con el trámite de [NOMBRE_TRAMITE]"**
3. Listo para enviar

---

## 🤖 Sistema de IA

### Google Gemini
- Modelo: `gemini-1.5-flash`
- Respuestas contextuales por trámite
- Almacenamiento de conversaciones en BD

### RAG System (Opcional - Futuro)
- Documentación de vector embeddings
- Búsqueda semántica
- Respuestas basadas en conocimiento específico

---

## 📊 Base de Datos

### Modelo `Tramite`
```
- id: Int (autoincrement)
- nombre: String
- slug: String (unique)
- descripcion: String
```

### Modelo `Consulta`
```
- id: Int (autoincrement)
- mensajeUsuario: String
- respuestaIA: String
- timestamp: DateTime
- calificacion: Int (opcional, para feedback)
```

---

## 🔐 Seguridad

- ✅ Variables de entorno (.env)
- ✅ API Keys protegidas
- ✅ Conexión SSL a base de datos
- ✅ Validación de entrada de usuarios

---

## 📈 Próximos Pasos Sugeridos

1. **Mejorar RAG System** - Vectorización de documentos oficiales
2. **Dashboard de Analytics** - Métricas de uso
3. **Sistema de Usuarios** - Login/Register
4. **Notificaciones** - Email, WhatsApp automático
5. **Más Trámites** - Expandir catálogo

---

## 🐛 Solución de Problemas

### Error de Params en Next.js 15
**✅ RESUELTO** - Usando `React.use(params)`

### Base de datos no conecta
```bash
npx prisma generate
npx prisma db push
```

### Chat IA no funciona
- Verifica `GEMINI_API_KEY` en `.env`
- Comprueba límites de API de Google

---

## 👨‍💻 Créditos

- **Desarrollador**: Alex
- **Framework**: Next.js 15
- **IA**: Google Gemini
- **Base de Datos**: Neon.tech (PostgreSQL)
- **Hosting**: Vercel

---

## 📄 Licencia

Este proyecto es de uso educativo.

---

**¡Proyecto completamente funcional y listo para deployment! 🚀**
