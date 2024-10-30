const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

// Set up views and public directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/userUpload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


// Import routes
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');
const cartController = require('./controllers/cartController');


// Use routes
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);


app.get('/', (req, res) => {
  // Your home route logic here
  res.send('Welcome to the home page');
});

app.get('/cart', (req, res) => {
  const cart = []; 
  res.render('cart', { cart });
});

app.post('/removeFromCart', cartController.removeFromCart);



// Serve admin.html for '/admin' route
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/views/admin.ejs');
});

// Serve index.html for '/' route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.ejs');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(5050, () => {
  console.log('http://localhost:5050');
});
