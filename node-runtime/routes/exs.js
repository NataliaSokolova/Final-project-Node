import express from "express";
import {
  getAllExs,
  createExs,
  addToFavorites,
  // addToFavorites, 
  // getAllFavorites, 
  // deleteExs
} from "../controllers/exs.js";

const router = express.Router();


router.route("/").get(getAllExs);
router.route("/").post(addToFavorites);

// router.delete("/:exsId", deleteExs);

export default router;