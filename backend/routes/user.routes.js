import express from "express"
import multer from "multer"; // 👉 Import multer

import { register,login,getUserProfile,getAllUsers, logout } from "../controllers/user.controller.js"

import {isAuthenticated} from '../middleware/isAuthenticated.js'
import {isAdmin}  from '../middleware/isAdmin.js'

const router=express.Router()
const upload = multer(); // 👉 Create a multer instance
router.route('/register').post(upload.none(),register)
router.route('/login').post(login)
router.route("/logout").get(logout)
router.route('/me').get(isAuthenticated,getUserProfile)
router.route("/all").get(isAuthenticated,isAdmin,getAllUsers)

export default router