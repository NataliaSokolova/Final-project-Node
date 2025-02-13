import express from "express";
import { register, login, checkToken } from "../controllers/auth.js";
import { StatusCodes } from "http-status-codes";
import authUser from "../middleware/authentication.js";


const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/check-token", authUser, checkToken)


export default router;