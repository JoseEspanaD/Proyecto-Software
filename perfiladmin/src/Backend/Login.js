require('dotenv').config();  // Cargar las variables de entorno
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
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
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
  });
};
app.get('/Clientes.js', async ( req,res) => {
  try {
    const query = `SELECT C.*, M.nombre_municipio, Z.nombre_zona 
      FROM customer C
      LEFT JOIN municipio M ON C.id_municipio = M.id_municipio
      LEFT JOIN zona Z ON C.id_zona = Z.id_zona
      WHERE C.status = 'active'`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});


app.get('/Clientes_recientes.js', async ( req,res) => {
  try {
    const query = `
      SELECT C.*, M.nombre_municipio, Z.nombre_zona 
      FROM customer C
      LEFT JOIN municipio M ON C.id_municipio = M.id_municipio
      LEFT JOIN zona Z ON C.id_zona = Z.id_zona
      WHERE C.status = 'active'
      ORDER BY C.id_customer DESC LIMIT 5`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
//Cuantos administradores hay
app.get('/total_administradores.js', async ( req,res) => {
  try {
    const query = `select count(*) from administrator where status = 'on-line'`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

//Cuantos clientes hay
app.get('/total_clientes.js', async ( req,res) => {
  try {
    const query = `select count(*) from customer  where status = 'active'`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

//Cuantos Productos Hay
app.get('/total_productos.js', async ( req,res) => {
  try {
    const query = `select count(*) from product where status ='1'`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
//Cuantas Categorias Hay
app.get('/total_categorias.js', async ( req,res) => {
  try {
    const query = `select count(*) from category_table where status = 'on-line'`;
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
    const query = `SELECT O.id_order,O.status,O.comment,O.date,O.total_price,C.name,O.fecha_p,
    CONCAT(
      EXTRACT(day FROM O.fecha_p- O.date), ' días ',
      EXTRACT(hour FROM O.fecha_p- O.date), ' horas ',
      EXTRACT(minute FROM O.fecha_p- O.date), ' minutos ',
      EXTRACT(second FROM O.fecha_p- O.date), ' segundos'
    ) AS duracionp
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
    const query = `SELECT O.id_order,O.status,O.comment,O.date,O.total_price,C.name,O.fecha_p,O.fecha_e,
    CONCAT(
      EXTRACT(day FROM O.fecha_p- O.date), ' días ',
      EXTRACT(hour FROM O.fecha_p- O.date), ' horas ',
      EXTRACT(minute FROM O.fecha_p- O.date), ' minutos ',
      EXTRACT(second FROM O.fecha_p- O.date), ' segundos'
    ) AS duracionp, 
    CONCAT(
      EXTRACT(day FROM O.fecha_e - O.fecha_p), ' días ',
      EXTRACT(hour FROM O.fecha_e - O.fecha_p), ' horas ',
      EXTRACT(minute FROM O.fecha_e - O.fecha_p), ' minutos ',
      EXTRACT(second FROM O.fecha_e - O.fecha_p), ' segundos'
    ) AS duracion
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
    FROM "order" O,customer C WHERE  O.id_customer = C.id_customer and O.status ='sin ver'`;
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
  const { name, password, e_mail, phone} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);  
    const query = `
      INSERT INTO administrator (name, e_mail, status, password, phone)
      VALUES ($1, $2, 'on-line', $3, $4)
    `;
    const result = await pool.query(query, [name, e_mail, hashedPassword,phone]);

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

app.post('/Registros_clientes.js', async (req, res) => {
  const { name, e_mail, password, address, phone, id_municipio, id_zona } = req.body;

  try {
      // Verificar si el email ya está registrado
      const emailCheck = await pool.query('SELECT * FROM customer WHERE e_mail = $1', [e_mail]);
      if (emailCheck.rows.length > 0) {
          return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo cliente
      const query = `
          INSERT INTO customer (name, e_mail, status, password, address, phone, id_municipio, id_zona)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id_customer
      `;
      const values = [name, e_mail, 'active', hashedPassword, address, phone.toString(), id_municipio, id_zona];
      const result = await pool.query(query, values);

      const newUserId = result.rows[0].id_customer;

      // Generar un token JWT para el nuevo usuario
      const token = jwt.sign({ id: newUserId, e_mail }, 'SECRET_KEY', { expiresIn: '1h' });

      res.status(201).json({ message: 'Cliente registrado con éxito', token, userId: newUserId });
  } catch (err) {
      console.error('Error al registrar el cliente:', err);
      res.status(500).json({ error: 'Error al registrar el cliente', details: err.message });
  }
});
//Buscar categorias para el navbar
// Endpoint en el backend para obtener las categorías
// server.js
app.get('/api/categories', async (req, res) => {
  try {
      const result = await pool.query('SELECT category AS code, name FROM category_table WHERE status = $1', ['on-line']);
      res.json(result.rows); // Devuelve categorías con 'code' y 'name'
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

app.get('/Categorias_table', async ( req,res) => {
  try {
    const query = `SELECT * FROM category_table`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
//Configuracion administrador
app.get('/api/admin', verifyToken, async (req, res) => {
  try {
      const result = await pool.query('SELECT name, e_mail, address, phone, municipio FROM administrator WHERE id_customer = $1', [req.userId]);
      if (result.rows.length > 0) {
          res.json(result.rows[0]);
      } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
      }
  } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
});



// Configuración de multer para guardar    
const storage = multer.diskStorage({
  destination: './uploads', // Carpeta donde se almacenarán las imágenes
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo
  },
});
const upload = multer({ storage: storage });

//Nueva Categoria
app.post('/Cateogory.js', upload.single('image'), async (req, res) => {
  const { name, category } = req.body;
  const image = req.file ? req.file.filename : null; // Nombre del archivo guardado

  try {
    const query = `
      INSERT INTO category_table(name, category, status,  image)
      VALUES ($1, $2,  'on-line', $3)
    `;
    const result = await pool.query(query, [name,category,image]);

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

// Ruta para agregar un nuevo producto con imagen
app.post('/Nuevoproduct', upload.single('image'), async (req, res) => {
  const { name, description, weight, price, category } = req.body;
  const image = req.file ? req.file.filename : null; // Nombre del archivo guardado

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
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Servir archivos de la carpeta 'uploads' de forma pública
app.use('/uploads', express.static('uploads'));

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
      'SELECT * FROM administrator WHERE e_mail = $1 and status=$2', [e_mail,'on-line']
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
      res.json(result.rows);
  } catch (err) {
      console.error('Error en la consulta:', err.message); // Log del error
      res.status(500).send('Error en el servidor');
  }
});
 

//Update los productos
// Cambiar los detalles de un producto

app.put('/UpdateProduct/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, weight, price, category, status } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  try {
    const query = `
      UPDATE product
      SET name = $1, description = $2, weight = $3, price = $4, category = $5, status = $6, image = $7
      WHERE id_product = $8
    `;
    await pool.query(query, [name, description, weight, price, category, status, imagePath, id]);

    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    console.error('Error en la consulta:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.put('/UpdateStatus/:id_order', async (req, res) => {
  const { id_order } = req.params;
  const { status } = req.body;
  try {
    const query = `
      UPDATE "order" 
      SET status = $1::VARCHAR,
          fecha_p = CASE 
                      WHEN $1::VARCHAR = 'En proceso' THEN NOW() AT TIME ZONE 'UTC' 
                      ELSE fecha_p 
                    END,
          fecha_e = CASE 
                      WHEN $1::VARCHAR = 'Entregados' THEN NOW() AT TIME ZONE 'UTC' 
                      ELSE fecha_e 
                    END
      WHERE id_order = $2
    `;

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




app.put('/UpdateStatusclientes/:id_customer', async (req, res) => {
  const { id_customer } = req.params;
  const { status } = req.body;
  try {
    const query = `UPDATE customer SET status = $1 WHERE id_customer = $2`;
    const result = await pool.query(query, [status, id_customer]);
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

app.put('/UpdateStatusadmin/:id_admin', async (req, res) => {
  const { id_admin} = req.params;
  const { status } = req.body;
  try {
    const query = `UPDATE administrator SET status = $1 WHERE id_admin = $2`;
    const result = await pool.query(query, [status, id_admin]);
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

// Nueva ruta para obtener municipios y zonas
app.get('/api/municipios-y-zonas', async (req, res) => {
  try {
      const municipios = await pool.query('SELECT * FROM municipio'); // Obtener municipios
      const zonas = await pool.query('SELECT * FROM zona'); // Obtener zonas
      res.json({ municipios: municipios.rows, zonas: zonas.rows });
  } catch (error) {
      console.error('Error al obtener municipios y zonas:', error);
      res.status(500).json({ error: 'Error al obtener municipios y zonas' });
  }
});
// Endpoint para obtener los productos más ordenados
app.get('/api/grafica', async (req, res) => {
  try {
    const query = `
      SELECT P.name, COUNT(I.id_product) AS veces_ordenado
      FROM order_item I
      JOIN product P ON I.id_product = P.id_product
      GROUP BY P.name
      ORDER BY veces_ordenado DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.post('/LogStatusChange', verifyToken, async (req, res) => {
    const { id_order, timeTaken } = req.body;
    const id_admin = req.userId; // Obtenemos el ID del administrador del token

    try {
        const query = `INSERT INTO status_change_log (id_order, id_admin, time_taken) VALUES ($1, $2, $3)`;
        await pool.query(query, [id_order, id_admin, timeTaken]);
        res.status(200).send('Tiempo registrado correctamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

app.get('/MonitoreoAdministradores', async (req, res) => {
    try {
        const query = `
            SELECT a.id_admin, a.name, AVG(s.time_taken) as avg_time
            FROM administrator a
            LEFT JOIN status_change_log s ON a.id_admin = s.id_admin
            GROUP BY a.id_admin
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

// Endpoint para agregar un nuevo municipio
app.post('/api/municipios', async (req, res) => {
  const { nombre_municipio } = req.body; // Asegúrate de que el nombre del campo coincida

  try {
    const query = `INSERT INTO municipio (nombre_municipio) VALUES ($1) RETURNING *`;
    const result = await pool.query(query, [nombre_municipio]);

    if (result.rowCount > 0) {
      res.status(201).json(result.rows[0]); // Devuelve el nuevo municipio agregado
    } else {
      res.status(500).send('Error al agregar municipio.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Endpoint para agregar una nueva zona
app.post('/api/zonas', async (req, res) => {
  const { nombre_zona } = req.body; // Asegúrate de que el nombre del campo coincida

  try {
    const query = `INSERT INTO zona (nombre_zona) VALUES ($1) RETURNING *`;
    const result = await pool.query(query, [nombre_zona]);

    if (result.rowCount > 0) {
      res.status(201).json(result.rows[0]); // Devuelve la nueva zona agregada
    } else {
      res.status(500).send('Error al agregar zona.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Endpoint para obtener todos los municipios
app.get('/api/municipios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM municipio'); // Obtener todos los municipios
    res.json(result.rows); // Devuelve los municipios
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    res.status(500).json({ error: 'Error al obtener municipios' });
  }
});

// Endpoint para obtener todas las zonas
app.get('/api/zonas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM zona'); // Obtener todas las zonas
    res.json(result.rows); // Devuelve las zonas
  } catch (error) {
    console.error('Error al obtener zonas:', error);
    res.status(500).json({ error: 'Error al obtener zonas' });
  }
});

// Endpoint para eliminar un municipio
app.delete('/api/municipios/:id', async (req, res) => {
  const { id } = req.params; // Obtener el ID del municipio a eliminar

  try {
    const query = `DELETE FROM municipio WHERE id_municipio = $1`;
    const result = await pool.query(query, [id]);

    if (result.rowCount > 0) {
      res.status(200).send('Municipio eliminado correctamente');
    } else {
      res.status(404).send('Municipio no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Endpoint para eliminar una zona
app.delete('/api/zonas/:id', async (req, res) => {
  const { id } = req.params; // Obtener el ID de la zona a eliminar

  try {
    const query = `DELETE FROM zona WHERE id_zona = $1`;
    const result = await pool.query(query, [id]);

    if (result.rowCount > 0) {
      res.status(200).send('Zona eliminada correctamente');
    } else {
      res.status(404).send('Zona no encontrada');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Iniciar el servidor
app.listen(5001, () => {
  console.log('Servidor corriendo en puerto 5001');
});