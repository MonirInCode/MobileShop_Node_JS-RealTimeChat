const fs = require('fs');
const path = require('path');
const multer = require('multer');

const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

exports.getAdminPage = (req, res) => {
  res.render('admin', { products });
};

exports.addProduct = (req, res) => {
  const { name, price, stock } = req.body;
  const imageName = req.file.filename;
  let idd = Date.now();
  const newProduct = { id: idd, name, price, stock, imageName };
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.redirect('/admin');
};

exports.getUpdateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  res.render('update', { product });
};

exports.updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, stock, existingImage } = req.body;
  const imageName = req.file ? req.file.filename : existingImage;
  const updatedProduct = { id: productId, name, price, stock, imageName };
  const updatedProducts = products.map(p => (p.id === productId ? updatedProduct : p));
  fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
  res.redirect('/admin');
};

exports.deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(p => p.id !== productId);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.redirect('/admin');
};