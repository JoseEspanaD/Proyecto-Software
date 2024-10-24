// CREACION DE SERVIDOR EXPRESS QUE SE CONECTA A POSTGRESQL Y EXPONE UNA API PARA OBTENER DATOS

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Cambia al puerto donde está corriendo tu frontend
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos de PostgreSQL
const pool = new Pool({
    user: 'postgres', // reemplaza con tu usuario de PostgreSQL
    host: 'localhost',
    database: 'Carnespa', // reemplaza con tu base de datos
    password: 'estudio', // reemplaza con tu contraseña
    port: 5432, // puerto por defecto de PostgreSQL
});

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('Servidor de Express está funcionando');
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

// Ruta para registrar un administrador
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

// Ruta para manejar la creacion de pedidos
app.post('/api/orders', async (req, res) => {
    // Registra los datos recibidos del cliente en la consola
    console.log('Recibiendo pedido:', req.body);
    
    // Desestructura los datos del pedido del cuerpo de la solicitud
    const { nombre, direccion, municipio, comentarios, fechaPedido, cartItems, total } = req.body;
  
    try {
      // Inicia una transacción en la base de datos
      console.log('Iniciando transacción');
      await pool.query('BEGIN');
  
      // Inserta el pedido principal en la tabla "order"
      console.log('Insertando en la tabla order');
      const orderResult = await pool.query(
        'INSERT INTO "order" (status, comment, date, total_price) VALUES ($1, $2, $3, $4) RETURNING id_order',
        ['Pendiente', comentarios, fechaPedido, total]
      );
  
      // Obtiene el ID del pedido recién creado
      const orderId = orderResult.rows[0].id_order;
      console.log('Orden creada con ID:', orderId);
  
      // Inserta cada artículo del carrito en la tabla order_item
      console.log('Insertando items del pedido');
      for (let item of cartItems) {
        await pool.query(
          'INSERT INTO order_item (amount, id_order, id_product) VALUES ($1, $2, $3)',
          [item.quantity, orderId, item.id]
        );
      }
  
      // Confirma la transacción si todo fue exitoso
      console.log('Confirmando transacción');
      await pool.query('COMMIT');
  
      // Envía una respuesta exitosa al cliente
      res.status(200).json({ message: 'Pedido creado con éxito', orderId });
    } catch (error) {
      // Si ocurre un error, lo registra en la consola
      console.error('Error detallado:', error);
      
      // Revierte la transacción en caso de error
      await pool.query('ROLLBACK');
      
      // Envía una respuesta de error al cliente
      res.status(500).json({ error: 'Error al procesar el pedido', details: error.message });
    }
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
        const token = jwt.sign({ e_mail: user.e_mail }, 'SECRET_KEY', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error al consultar la base de datos', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
