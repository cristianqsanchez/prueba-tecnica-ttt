### Para ejecutar el proyecto

Clonar el repositorio
```bash
git clone https://github.com/cristianqsanchez/prueba-tecnica-ttt.git && cd prueba-tecnica-ttt/
```

Instalar dependencias y ejecutar backend en el puerto ``4000``
```bash
cd backend/
npm install
npx prisma generate
npm run start:dev
```

Instalar dependencias y ejecutar frontend en el puerto ``3000``
```bash
cd frontend/
npm install
npm run dev
```

### Explicación Técnica

- Se trata de una solución monorepositorio con los paquetes backend y frontend
-  #### Backend
- El backend expone los siguientes endpoints
  - ``/api/users`` para la creación de un usuario con credenciales
  - ``/api/auth`` para la autenticación de un usuario con jwt
  - ``/api/tasks`` con las operaciones crud de la lista de tareas
- He decidido usar una pequeña base de datos sqlite para no tener los datos en memoria y simular un entorno un poco más real
- ### Frontend
- El frontend consume todos los endpoints de la api a través de las server actions de next.js
- Mediante estas server actions hago uso de una cookie para almacenar el token jwt y validar las sesiones de usuario
