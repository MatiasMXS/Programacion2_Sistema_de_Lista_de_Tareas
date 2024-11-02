import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
  
  (async () => {
    try {
      const connection = await pool.getConnection();
      console.log("Base de datos conectada");
      connection.release(); // libera la conexión para que vuelva al pool y este disponible para futuras consultas.
    } catch (error) {
      console.log(error);
    }
  })();
  export default pool;
  