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
