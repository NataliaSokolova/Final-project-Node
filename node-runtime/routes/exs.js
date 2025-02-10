import express from "express";
import {
  getAllExs,
  addToFavorites,
  getAllFavorites,
  deleteFavorites,
} from "../controllers/exs.js";

const router = express.Router();


router.route("/").get(getAllExs)
router.route("/all").get(getAllFavorites);
router.route("/").post(addToFavorites);
router.route("/").delete(deleteFavorites);



export default router;