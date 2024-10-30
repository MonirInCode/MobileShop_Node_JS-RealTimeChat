const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const cartFilePath = path.join(__dirname, '..', 'data', 'cart.json');
let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf8'));

exports.getProducts = (req, res) => {
  res.render('index', { products });
};

exports.getProductDetails = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  res.render('product', { product });
};

exports.addToCart = (req, res) => {
  const { id, name, price ,imageName} = req.body;
  const productId = parseInt(id);

  const productsData = fs.readFileSync(productsFilePath, 'utf8');
  const products = JSON.parse(productsData);

  const product = products.find(p => p.id === productId);
  const existingProductIndex = cart.findIndex(p => p.id === productId);

  if (product.stock > 0) {
  if (product) {
    if (existingProductIndex !== -1) {
      const existingProduct = cart[existingProductIndex];
      const newQuantity = existingProduct.quantity + 1;
      existingProduct.quantity = newQuantity;
      existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;

      if (product.stock > 0) {
        product.stock--;
      }
    } else {
      const totalPrice = price;
      cart.push({ id: productId, name, price, quantity: 1, totalPrice ,imageName });

      if (product.stock > 0) {
        product.stock--;
      }
    }

    const updatedProducts = products.map(p => (p.id === productId ? product : p));

    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
  }
  }
  res.redirect('/#menu-section');
};




exports.removeFromCart = (req, res) => {
  const productId = parseInt(req.body.id);
  const product = products.find(p => p.id === productId);
  const existingProductIndex = cart.findIndex(p => p.id === productId);

  if (existingProductIndex !== -1) {
    const existingProduct = cart[existingProductIndex];
    product.stock += existingProduct.quantity;
    cart = cart.filter(p => p.id !== productId);
  }

  const updatedProducts = products.map(p => (p.id === productId ? product : p));
  fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
  fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));

  res.redirect('/#menu-section');
};