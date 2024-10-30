const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(__dirname, '..', 'data', 'cart.json');

let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf8'));

router.post('/', (req, res) => {
  const { id, name, price } = req.body;

  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));

  res.redirect('/cart');
});

router.get('/', (req, res) => {
  res.render('cart', { cart });
});

module.exports = router;