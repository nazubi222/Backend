const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/create', ProductController.createProduct)
router.post('/update/:id', ProductController.updateProduct)
router.delete('/delete/:id', ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)
router.get('/getById/:id', ProductController.getProductById)
// router.get('/getByType/:type', ProductController.getProductByType)
module.exports = router