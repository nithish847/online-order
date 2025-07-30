import express from 'express'
import {isAuthenticated} from '../middleware/isAuthenticated.js'
import {isAdmin}  from '../middleware/isAdmin.js'
import { cancelOrder, getAllOrders, getUserOrder, placeOrder, updateOrderStatus } from '../controllers/order.controller.js'

const router=express.Router()

router.route("/:id/status").put(isAuthenticated,isAdmin,updateOrderStatus)
router.route("/:id").delete( isAuthenticated, cancelOrder);
router.route("/my").get(isAuthenticated,getUserOrder)
router.route('/').post(isAuthenticated,placeOrder)
router.route('/').get(isAuthenticated,isAdmin,getAllOrders)


export default router