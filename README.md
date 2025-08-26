<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">API-DE-UN-SISTEMA-DE-SUBASTAS-EN-LINEA</h1></p>
<p align="center">
	<em><code>❯ Una API robusta y escalable para un sistema de subastas en línea.</code></em>
</p>
<p align="center">
	<!-- Shields.io badges disabled, using skill icons. --></p>
<p align="center">Construido con las siguientes herramientas y tecnologías:</p>
<p align="center">
	<a href="https://skillicons.dev">
		<img src="https://skillicons.dev/icons?i=express,md,sequelize,rabbitmq,">
	</a></p>
<br>

## 🔗 Tabla de Contenidos
-📍 Resumen
-👾 Características
-📁 Estructura del Proyecto
-📂 Índice del Proyecto
-🚀 Empezando
-☑️ Requisitos Previos
-⚙️ Instalación
-🤖 Uso
---

## 📍 Resumen

<code>❯ Este proyecto es la base backend de un sistema de subastas en línea. Utiliza una arquitectura modular para la gestión de usuarios, productos y subastas. Implementa funcionalidades clave como el registro y la autenticación de usuarios, la creación y gestión de productos, y el manejo de pujas y notificaciones.</code>

---

## 👾 Características

* **Autenticación de Usuarios:** Permite a los usuarios registrarse y autenticarse de forma segura.
* **Gestión de Subastas:** Crea y administra subastas con fechas de inicio y finalización.
* **Pujas en Tiempo Real:** Facilita la recepción y validación de pujas por los productos.
* **Notificaciones:** Utiliza RabbitMQ para notificar al ganador de una subasta al finalizar el tiempo.
* **Programación de Tareas:** Emplea un cron job para verificar y finalizar subastas automáticamente.
* **Validaciones:** Asegura la integridad de los datos de entrada para usuarios, productos y subastas.
* **Control de Acceso:** Incluye middlewares para proteger rutas y verificar roles de administrador.

---

## 📁 Project Structure

```sh
└── API-de-Un-Sistema-de-Subastas-en-Linea/
    ├── README.md
    ├── app.js
    ├── consumers
    │   └── notificationWinner.consumer.js
    ├── controllers
    │   ├── auctions.controller.js
    │   ├── products.controller.js
    │   └── user.controller.js
    ├── db
    │   └── mysql.db.js
    ├── middlewares
    │   ├── auth.middleware.js
    │   └── isAdmin.middleware.js
    ├── models
    │   ├── associations.js
    │   ├── auctions.model.js
    │   ├── products.model.js
    │   └── user.model.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── auctions.routes.js
    │   ├── products.routes.js
    │   └── user.routes.js
    ├── services
    │   ├── cronJob.services.js
    │   └── rabbitMQ.services.js
    └── validations
        ├── auctions.validation.js
        ├── products.validation.js
        └── user.validation.js
```


### 📂 Índice del Proyecto
<details open>
	<summary><b><code>API-DE-UN-SISTEMA-DE-SUBASTAS-EN-LINEA/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/app.js'>app.js</a></b></td>
				<td><code>❯ Archivo principal que levanta el servidor Express e inicializa las rutas y la conexión a la base de datos.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ Archivo generado por npm que garantiza la consistencia en las dependencias del proyecto.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/package.json'>package.json</a></b></td>
				<td><code>❯ Define las dependencias del proyecto y los scripts para su ejecución.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- middlewares Submodule -->
		<summary><b>middlewares</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/middlewares/isAdmin.middleware.js'>isAdmin.middleware.js</a></b></td>
				<td><code>❯ Middleware para verificar si el usuario autenticado tiene rol de administrador.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/middlewares/auth.middleware.js'>auth.middleware.js</a></b></td>
				<td><code>❯ Middleware que valida el token de autenticación de un usuario.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- consumers Submodule -->
		<summary><b>consumers</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/consumers/notificationWinner.consumer.js'>notificationWinner.consumer.js</a></b></td>
				<td><code>❯ Consumidor de mensajes de RabbitMQ que procesa y envía notificaciones al ganador de una subasta.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- controllers Submodule -->
		<summary><b>controllers</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/controllers/user.controller.js'>user.controller.js</a></b></td>
				<td><code>❯ Lógica de negocio para la gestión de usuarios (registro, login, etc.).</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/controllers/auctions.controller.js'>auctions.controller.js</a></b></td>
				<td><code>❯ Lógica de negocio para la gestión de subastas (creación, pujas, etc.).</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/controllers/products.controller.js'>products.controller.js</a></b></td>
				<td><code>❯ Lógica de negocio para la gestión de productos (creación, actualización, etc.).</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- models Submodule -->
		<summary><b>models</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/models/user.model.js'>user.model.js</a></b></td>
				<td><code>❯ Define el modelo de datos para la tabla users.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/models/associations.js'>associations.js</a></b></td>
				<td><code>❯ Define las relaciones entre los modelos de la base de datos (uno a uno, uno a muchos, etc.).</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/models/auctions.model.js'>auctions.model.js</a></b></td>
				<td><code>❯ Define el modelo de datos para la tabla auctions.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/models/products.model.js'>products.model.js</a></b></td>
				<td><code>❯ Define el modelo de datos para la tabla products.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- routes Submodule -->
		<summary><b>routes</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/routes/auctions.routes.js'>auctions.routes.js</a></b></td>
				<td><code>❯ Define las rutas de la API relacionadas con las subastas.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/routes/user.routes.js'>user.routes.js</a></b></td>
				<td><code>❯ Define las rutas de la API relacionadas con los usuarios.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/routes/products.routes.js'>products.routes.js</a></b></td>
				<td><code>❯ Define las rutas de la API relacionadas con los productos.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- services Submodule -->
		<summary><b>services</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/services/rabbitMQ.services.js'>rabbitMQ.services.js</a></b></td>
				<td><code>❯ Servicio para la comunicación con RabbitMQ, utilizado para el sistema de mensajería.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/services/cronJob.services.js'>cronJob.services.js</a></b></td>
				<td><code>❯ Servicio que implementa la lógica para ejecutar tareas programadas.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- validations Submodule -->
		<summary><b>validations</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/validations/products.validation.js'>products.validation.js</a></b></td>
				<td><code>❯ Reglas de validación para los datos de entrada de los productos.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/validations/auctions.validation.js'>auctions.validation.js</a></b></td>
				<td><code>❯ Reglas de validación para los datos de entrada de las subastas.</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/validations/user.validation.js'>user.validation.js</a></b></td>
				<td><code>❯ Reglas de validación para los datos de entrada de los usuarios.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- db Submodule -->
		<summary><b>db</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea/blob/master/db/mysql.db.js'>mysql.db.js</a></b></td>
				<td><code>❯ Configuración y conexión a la base de datos MySQL.</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

---
## 🚀 Empezando

### ☑️ Requisitos Previos

Antes de comenzar con la API, asegúrate de que tu entorno de ejecución cumpla con los siguientes requisitos:

- **Lenguaje de Programación:** JavaScript
- **Gestor de Paquetes:** Npm


### ⚙️ Instalación

Instala la API de un Sistema de Subastas en Línea usando uno de los siguientes métodos:

**Construir desde el código fuente:**

1. Clona el repositorio de la API:
```sh
❯ git clone https://github.com/Angelitoo777/API-de-Un-Sistema-de-Subastas-en-Linea
```

2. Navega al directorio del proyecto:
```sh
❯ cd API-de-Un-Sistema-de-Subastas-en-Linea
```

3. Instala las dependencias del proyecto:


**Usando `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




### 🤖 Uso
Ejecuta la API de un Sistema de Subastas en Línea con el siguiente comando:
**Usando `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```

---
