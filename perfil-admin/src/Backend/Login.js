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
    origin: 'http://localhost:3001',   
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

app.get('/Administradores.js', async ( req,res) => {
  try {
    const query = `SELECT * FROM administrator`;
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
      SELECT I.id_item, P.name, P.price, (P.price * I.amount) AS total_price 
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
  const { name, password, e_mail, address,phone,municipio } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
    const query = `
      INSERT INTO administrator (name, e_mail, status, password, address,phone,municipio)
      VALUES ($1, $2, 'on-line', $3, $4,$5,$6)
    `;
    const result = await pool.query(query, [name, e_mail, hashedPassword, address,phone,municipio]);

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
      VALUES ($1, $2, $3, $4, '1', $5, $6)
      `;
const result = await pool.query(query, [name, description, weight, price, category, image]);


    if (result.rowCount > 0) {
      res.status(200).send('Registro exitoso!');
    } else {
      res.status(500).send('Error al registrar.');
    }
    console.log(req.body); // Agregar esta línea

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
// Ruta para obtener un producto por ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
      return res.status(400).json({ message: 'ID del producto es requerido' });
  }

  try {
      const result = await pool.query('SELECT * FROM product WHERE id_product = $1', [parseInt(id, 10)]);
      
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(result.rows[0]);
  } catch (err) {
      console.error('Error en la consulta:', err.message);
      res.status(500).send('Error en el servidor');
  }
});
// Ruta para obtener productos, con opción de filtrar por categoría
app.get('/api/products', async (req, res) => {
  const { category } = req.query; // Obtener la categoría de la query string
  let query = "SELECT * FROM product WHERE status = '1'";
  
  if (category) {
      // Agregar la condición de categoría si se proporciona
      switch (category) {
          case 'chorizosylonganizas':
              query += " AND category = 'cl'";
              break;
          case 'madurados':
              query += " AND category = 'm'";
              break;
          case 'embutidos':
              query += " AND category = 'e'";
              break;
          case 'carnes':
              query += " AND category = 'c'";
              break;
          default:
              return res.status(400).send('Categoría no válida'); // Manejo de categoría no válida
      }
  }

  try {
      const result = await pool.query(query);
      console.log('Resultado:', result.rows); // Log del resultado
      res.json(result.rows);
  } catch (err) {
      console.error('Error en la consulta:', err.message); // Log del error
      res.status(500).send('Error en el servidor');
  }
});
 

//Update los productos
// Cambiar los detalles de un producto
app.put('/UpdateProduct/:id_product', async (req, res) => {
  const { id_product } = req.params;
  const { name, description, weight, price, category, image, status } = req.body;

  try {
    const query = `
      UPDATE product 
      SET name = $1, description = $2, weight = $3, price = $4, category = $5, image = $6, status = $7 
      WHERE id_product = $8
    `;
    const result = await pool.query(query, [name, description, weight, price, category, image, status, id_product]);

    if (result.rowCount > 0) {
      res.status(200).send('Producto actualizado correctamente');
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error en el servidor');
  }
});




// Iniciar el servidor
app.listen(5001, () => {
  console.log('Servidor corriendo en puerto 5001');
});
