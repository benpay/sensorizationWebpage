# Sensorization Frontend 📡

Plataforma web para la gestión, administración e ingesta de datos de sensores IoT desarrollada en **React**.

Este proyecto proporciona una interfaz gráfica intuitiva y moderna que permite gestionar el ciclo de vida de los sensores (alta, consulta, modificación y borrado) así como realizar ingestas manuales de telemetría en formato JSON hacia el backend centralizado.

---

## 🚀 Características Principales

- 🔐 **Autenticación de Usuarios**:
  - Registro de nuevos usuarios (`RegisterForm`).
  - Inicio de sesión con gestión de sesión (`LoginForm`).
- 🛠️ **Gestión de Sensores (CRUD)**:
  - **Añadir**: Registro de sensores especificando nombre, código, tipo (`HTTP_POLL`, `MANUAL_UPLOAD`), estado (`ACTIVE`, `PAUSED`) y URL de origen.
  - **Actualizar**: Modificación de sensores existentes a través de su identificador único (UUID).
  - **Buscar**: Consulta detallada de datos de un sensor específico por UUID.
  - **Listar**: Visualización global de todos los sensores registrados en la base de datos.
  - **Eliminar**: Borrado seguro de sensores por UUID.
- 📤 **Ingesta de Datos**:
  - Interfaz para el envío de payloads en formato JSON asociados al UUID de un sensor específico (`Ingestion`).
- 🎨 **Panel de Control (Dashboard)**:
  - Navegación lateral integrada (`Sidebar`) con iconos explicativos.
  - Control de sesión de usuario y diseño adaptable.

---

## 🛠️ Tecnologías Utilizadas

- **Core**: [React 19](https://react.dev/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Estilos**: CSS3 con diseño personalizado (Dark Theme)
- **Cliente HTTP**: Fetch API nativo con integración de credenciales (`credentials: 'include'`)
- **Herramienta de Construcción**: `react-scripts` (Create React App)

---

## 📁 Estructura del Proyecto

```text
sensorization/
├── public/                # Archivos públicos de la aplicación
├── src/
│   ├── components/
│   │   ├── Forms/         # Formularios de autenticación (Login, Registro)
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   └── FormStyle.css
│   │   └── Sensors/       # Componentes de gestión e ingesta de sensores
│   │       ├── Ingest/    # Módulo de ingesta manual de datos
│   │       ├── Sensors/   # Formularios y listas de sensores
│   │       └── Sidebar/   # Menú de navegación lateral y cabecera
│   ├── services/
│   │   └── api.js         # Servicio centralizado de peticiones HTTP a la API
│   ├── App.js             # Componente principal y control de autenticación
│   ├── App.css            # Estilos globales de la app
│   └── index.js           # Punto de entrada de React
├── package.json
└── README.md
```

---

## 🔌 Integración con la API Backend

El frontend se comunica de forma predeterminada con una API REST backend alojada en `http://localhost:5000`.

| Módulo | Método | Endpoint | Descripción |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/login` | Autenticación de usuarios |
| **Auth** | `POST` | `/logout` | Cierre de sesión de usuarios |
| **Auth** | `POST` | `/register` | Registro de nuevos usuarios |
| **Sensors** | `POST` | `/sensors/registerSensor` | Registro de un nuevo sensor |
| **Sensors** | `PATCH` | `/sensors/updateSensorById/:id` | Actualización de datos de un sensor |
| **Sensors** | `GET` | `/sensors/getSensors` | Obtención del listado de sensores |
| **Sensors** | `GET` | `/sensors/getSensorById/:id` | Consulta de un sensor por UUID |
| **Sensors** | `DELETE` | `/sensors/deleteSensorById/:id` | Borrado de un sensor por UUID |
| **Ingestion** | `POST` | `/ingestion/ingest/:id/ingest` | Ingesta de payload JSON por UUID |

---

## 📋 Requisitos Previos

- **Node.js**: `v18.0.0` o superior
- **npm**: `v9.0.0` o superior
- **Servidor Backend**: Debe estar ejecutándose en `http://localhost:5000` (o configurar la variable base en `src/services/api.js`).

---

## ⚙️ Instalación y Puesta en Marcha

1. **Clonar el repositorio e ingresar a la carpeta del proyecto**:
   ```bash
   cd sensorization
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm start
   ```
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

- `npm start`: Ejecuta la aplicación en modo desarrollo.
- `npm test`: Lanza el ejecutor de pruebas en modo interactivo.
- `npm run build`: Compila la aplicación para producción en la carpeta `build`.
- `npm run eject`: Remueve la dependencia única de construcción de `react-scripts`.

---

## 🧩 Mejoras pendientes

- Validación de datos de entrada. En el front no se hacen casi validaciones y se hacen casi todas en el back, esto se debería implementar en el front también para tener doble validación.
- Dividir un poco mas los componentes en vez de reutilizarlos tanto. Por tiempo y lógica reducida he reutilizado muchos componentes, pero con esta lógica si la información cambia o crece impacta en muchas partes.
- La visualización de datos es muuy plana, se podría mejorar el aspecto visual.
- La persistencia de la sesión, cada vez que refrescas se pierde la sesión, con un localStorage se podría corregir.
- La url esta hardcodeada, eso se puede mejorar parametrizándola
