const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración para manejar datos de formularios HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Rutas
app.get('/', (req, res) => {

  app.get('/publish', (req, res) => {
    res.sendFile(__dirname + '/views/publish.html');
  });
  
  app.post('/publish', (req, res) => {
    const { postTitle, postContent } = req.body;
    // Aquí puedes guardar los datos del post o realizar cualquier otra lógica que necesites
    console.log('Título:', postTitle);
    console.log('Contenido:', postContent);
    res.send('Publicación exitosa');
  });
  
  // Página principal - Ver todas las publicaciones
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res) => {
  // Página de inicio de sesión
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/signup', (req, res) => {
  // Página de registro
  res.sendFile(__dirname + '/views/signup.html');
});

// Endpoint de autenticación (simulado)
const users = []; // Almacenamiento simulado de usuarios

app.post('/login', (req, res) => {
  // Lógica de inicio de sesión
  // Verificar usuario y contraseña (simulado)
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Usuario autenticado, redirigir al dashboard
    res.redirect('/dashboard');
  } else {
    res.send('Credenciales inválidas');
  }
});

app.post('/signup', (req, res) => {
  // Registro de nuevos usuarios
  const { username, password, firstName, lastName } = req.body;
  // Validar datos y agregar usuario (aquí deberías hacer validaciones más completas)
  users.push({ username, password, firstName, lastName });
  res.redirect('/login');
});

app.get('/dashboard', (req, res) => {
  // Página del panel de control (solo usuarios autenticados)
  res.sendFile(__dirname + '/views/dashboard.html');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
