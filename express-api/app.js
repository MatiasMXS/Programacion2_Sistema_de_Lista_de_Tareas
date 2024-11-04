import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());

//routs
app.use("/auth", authRoutes);
app.use("/tareas", tareasRoutes);

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto: ${port}`);
});