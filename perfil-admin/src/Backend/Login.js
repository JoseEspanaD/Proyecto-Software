require('dotenv').config();  // Cargar las variables de entorno
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Carnespa',
  password: 'estudio',
  port: 5432,
});

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000',   
    methods: ['POST', 'GET', 'PUT','OPTIONS','DELETE'],
    allowedHeaders: ['Content-Type']
})); 

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SECRET_KEY = process.env.SECRET_KEY;  // Obtener la clave secreta de las variables de entorno
app.get('/Clientes.js', async ( req,res) => {
  try {
    const query = `SELECT * FROM customer`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

//Pedidos
app.get('/Enproceso.js', async (req, res) => {
  try {
    const query = `SELECT O.id_order,O.status,O.comment,O.date,O.total_price,C.name 
    FROM "order" O,customer C WHERE  O.id_customer = C.id_customer and O.status ='En proceso'`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
//Entregados
app.get('/Entregados.js', async (req, res) => {
  try {
    const query = `SELECT O.id_order,O.status,O.comment,O.date,O.total_price,C.name 
    FROM "order" O,customer C WHERE  O.id_customer = C.id_customer and O.status ='Entregados'`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
//Sin ver
app.get('/Sinver.js', async (req, res) => {
  try {
    const query = `SELECT O.id_order,O.status,O.comment,O.date,O.total_price,C.name 
    FROM "order" O,customer C WHERE  O.id_customer = C.id_customer and O.status ='Sin ver'`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
app.get('/Descripcion.js/:id_order', async (req, res) => {
  const { id_order } = req.params; // obtener el parámetro id_order
  try {
    const query = `
      SELECT I.id_articulo, P.name, P.price, (P.price * I.amount) AS total_price 
      FROM order_item I 
      JOIN product P ON P.id_product = I.id_product
      WHERE I.id_order = $1`; // usar el parámetro en la consulta
    const result = await pool.query(query, [id_order]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta para registrar un nuevo administrador
app.post('/Registros.js', async (req, res) => {
  const { name, password, e_mail, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
    const query = `
      INSERT INTO administrator (name, e_mail, status, password, address)
      VALUES ($1, $2, 'on-line', $3, $4)
    `;
    const result = await pool.query(query, [name, e_mail, hashedPassword, address]);

    if (result.rowCount > 0) {
      res.status(200).send('Registro exitoso!');
    } else {
      res.status(500).send('Error al registrar.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
// Ruta para Nuevoproduct un nuevo administrador
app.post('/Nuevoproduct.js', async (req, res) => {
  const { name, description, weight, price,category,image } = req.body;

  try { 
    const query = `
      INSERT INTO product (name, description, weight, price, status, category, image)
      VALUES ($1, $2, $3, $4, 'Listo', $5, $6)
      `;
const result = await pool.query(query, [name, description, weight, price, category, image]);


    if (result.rowCount > 0) {
      res.status(200).send('Registro exitoso!');
    } else {
      res.status(500).send('Error al registrar.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
//Ruta para la tabla de pedidos dependiendo de su estado
app.get('/pedidos', (req, res) => {
  const estado = req.query.estado;
  const query = 'SELECT id_order, status, comment, date,total_price,id_customer FROM "order" WHERE status = $1';
  pool.query(query, [estado], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener pedidos' });
    } else {
      res.json(result.rows);
    }
  });
});


// Ruta para el login de administrador
app.post('/login', async (req, res) => {
  const { e_mail, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM administrator WHERE e_mail = $1', [e_mail]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ e_mail: user.e_mail }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error al consultar la base de datos', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
//Cambiar el estatus de los productos
app.put('/UpdateStatus/:id_order', async (req, res) => {
  const { id_order } = req.params;
  const { status } = req.body;

  try {
    const query = `UPDATE "order" SET status = $1 WHERE id_order = $2`;
    const result = await pool.query(query, [status, id_order]);

    if (result.rowCount > 0) {
      res.status(200).send('Estatus actualizado correctamente');
    } else {
      res.status(404).send('Pedido no encontrado');
    }
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error en el servidor');
  }
});




// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
