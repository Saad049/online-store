import express from "express";
import "reflect-metadata";
import "./config/db";
import  dotenv from "dotenv";
import path from "path";
import registerRoutes from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swager";




dotenv.config();

const app = express();
app.use(express.json());
registerRoutes(app);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);  

});
