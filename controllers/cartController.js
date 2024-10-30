
const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(__dirname, '../data/cart.json');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

exports.removeFromCart = (req, res) => {
    const productId = parseInt(req.body.id);
  
    let cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf8'));
  
    const productIndex = cart.findIndex(item => item.id === productId);
  
    if (productIndex !== -1) {
        const removedQuantity = cart[productIndex].quantity;
      
        const product = products.find(p => p.id === productId);
        if (product) {
            product.stock++;

            const updatedProducts = products.map(p => (p.id === productId ? product : p));
            fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
            fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
        }
      
        cart[productIndex].quantity--;
  
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
  
        fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
    }
  
    res.redirect('/cart');
};

