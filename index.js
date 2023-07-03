const express = require('express');
const connection = require('./bd');
const bodyParser = require('body-parser');
const platoModel = require('./modelos/plato');
const path = require('path');

const app = express();

// Configurar middleware de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Configuración de vistas
app.use(express.static(path.join(__dirname, 'Frontend')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/Frontend/vistas');


//app.use(express.static(path.join(__dirname, '/Frontend/styles')));

//Ruta raiz
app.get('/',(req,res)=>{
  res.render('index')
});
app.get('/login',(req,res)=>{
  res.render('Login')
});
app.get('/menu',(req,res)=>{
  res.render('Menu')
});

app.get('/detalle',(req,res)=>{
  res.render('Detalle')
});
app.get('/estadoMedico',(req,res)=>{
  res.render('EstadoMedico')
});
app.get('/solicitarMenu',(req,res)=>{
  res.render('SolicitarMenu')
});
app.get('/validacion',(req,res)=>{
  res.render('Validacion')
});


// Ruta para ver un usuario por ID
app.get('/detalle/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM plato WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ', error);
      res.status(500).send('Error en el servidor');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    const plato = results[0];
    res.render('nutricionista', { plato });
  });
});

//OBTENER PLATOS 
app.get('/catalogo', (req, res) => {
  platoModel.obtenerTodosLosPlatos((error, platos) => {
    if (error) {
      console.error('Error al obtener los platos: ', error);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.render('Catalogo', { platos });
  });
});
app.get('/nutricionista', (req, res) => {
  platoModel.obtenerTodosLosPlatos((error, platos) => {
    if (error) {
      console.error('Error al obtener los platos: ', error);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.render('Nutricionista', { platos });
  });
});

//CREAR NUEVO USUARIO
app.post('/login/nuevo', (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  
  const nuevoUsuario = { nombre, correo, contraseña };
  connection.query('INSERT INTO cliente SET ?', nuevoUsuario, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Nuevo usuario creado');
    res.redirect('/estadoMedico'); // Redireccionar al inicio o a la página que desees después de crear el usuario
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
