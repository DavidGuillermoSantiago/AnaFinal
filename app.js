import express from "express";
import cors from "cors";
import helmet from "helmet"; // Importa helmet
import userRoutes from "./src/routes/user.routes.js";
import projectRoutes from "./src/routes/project.routes.js";

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*', // Permite todas las orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization', 'x-access-token']
};

app.use(cors(corsOptions));

// Configuración de Helmet para CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // Permitir recursos desde el mismo origen
            imgSrc: ["'self'", "data:", "https:"], // Permitir imágenes desde el mismo origen y HTTPS
            scriptSrc: ["'self'", "https://apis.google.com"], // Permitir scripts desde el mismo origen y Google APIs
            styleSrc: ["'self'", "https://fonts.googleapis.com"], // Permitir estilos desde el mismo origen y Google Fonts
            // Agrega otras directivas según sea necesario
        },
    },
}));

// Permitir que Express entienda formato JSON
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

export default app;
