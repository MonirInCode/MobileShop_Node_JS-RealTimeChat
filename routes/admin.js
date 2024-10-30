const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/userUpload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', adminController.getAdminPage);

router.post('/add', upload.single('image'), adminController.addProduct);

router.get('/update/:id', adminController.getUpdateProduct);
router.post('/update/:id', upload.single('image'), adminController.updateProduct);

router.get('/delete/:id', adminController.deleteProduct);

module.exports = router;