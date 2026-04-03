# Escuela de Música – Frontend

Aplicación web desarrollada con React + Vite para la gestión y visualización de una escuela de música.
Permite a los usuarios consultar información pública y a los administradores gestionar contenidos.

Conectado con el repositorio del backend:
https://github.com/tmiguel78/escuela-musica-back

---

## Demo

Aplicación desplegada (Netlify):
https://escuela-de-musica-corcheas.netlify.app/

API Backend:
https://escuela-musica-back.onrender.com/api

---

## Descripción

Este frontend consume una API REST desarrollada con Node.js y Express, permitiendo:

- Visualización de instrumentos
- Consulta del profesorado
- Tablón de anuncios
- Contacto con la escuela
- Acceso administrador con autenticación

---

## Tecnologías utilizadas

- React
- Vite
- React Router
- Firebase Authentication
- Fetch API

---

## Autenticación

Se utiliza Firebase Authentication para gestionar el acceso de administrador.

- Login mediante email y contraseña
- Obtención de token JWT (JSON Web Token)
- Envío del token en headers (`Authorization: Bearer ...`)
- Control de acceso a rutas protegidas

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_BACKEND_URL=your_backend_url
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Estructura del proyecto

```bash
escuela-musica-front/
│
├── public/                     # Recursos públicos estáticos
├── src/
│   ├── components/            # Componentes reutilizables y formularios
│   │   ├── FormEditBulletin.jsx
│   │   ├── FormEditInstrument.jsx
│   │   ├── FormEditTeacher.jsx
│   │   ├── FormNewBulletin.jsx
│   │   ├── FormNewInstrument.jsx
│   │   ├── FormNewTeacher.jsx
│   │   ├── LoginButton.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── config/                # Configuración externa de la app
│   │   └── firebase.js
│   │
│   ├── pages/                 # Páginas principales de la aplicación
│   │   ├── Bulletin.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Instruments.jsx
│   │   ├── Login.jsx
│   │   └── Teachers.jsx
│   │
│   ├── App.css
│   ├── App.jsx                # Definición de rutas y layout principal
│   ├── index.css
│   └── main.jsx               # Punto de entrada de React
│
├── .env.example               # Plantilla de variables de entorno
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/tmiguel78/escuela-musica-front
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` (ver sección anterior)

4. Ejecutar el proyecto:

```bash
npm run dev
```

La aplicación estará disponible en:

```bash
http://localhost:5173
```

---

## Backend

Este frontend está conectado con el siguiente repositorio backend:

https://github.com/tmiguel78/escuela-musica-back

---

## Acceso administrador (demo)

Para probar las funcionalidades de administrador:

- Email: admin@escuelademusicacorcheas.com
- Password: 1234567890

⚠️ Cuenta de prueba sin acceso a datos sensibles.

---

## Funcionalidades principales

- Navegación entre páginas con React Router
- Consumo de API REST
- Renderizado dinámico de datos
- Protección de rutas privadas
- Login persistente con token
- Diseño responsive adaptado a móviles y tablets.

---

## ⚠️ Notas

- El backend puede tardar unos 20 segundos en responder si está inactivo.
- Se recomienda esperar unos segundos si aparece “Cargando...”

---

## Autor

José Antonio Miguel

---
