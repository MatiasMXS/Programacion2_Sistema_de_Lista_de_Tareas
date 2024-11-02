import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = 3000;

//middleware
app.use(express.json());

//routs
app.use("/auth", authRoutes);

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto: ${port}`);
});