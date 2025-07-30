import express from 'express'
import { addProduct, deleteProductById, getAllProduct, getSingleProduct, upDateProduct } from '../controllers/product.controller.js'
import {isAuthenticated} from '../middleware/isAuthenticated.js'
import {isAdmin}  from '../middleware/isAdmin.js'

const router=express.Router()

router.route('/allproducts').get(getAllProduct)
router.route("/products").post(isAuthenticated,isAdmin,addProduct)
//
router.route('/products/:id').get(getSingleProduct); 
//
router.route('/products/:id').put(isAuthenticated,isAdmin,upDateProduct)
router.route("/products/:id").delete(isAuthenticated,isAdmin,deleteProductById)

export default router