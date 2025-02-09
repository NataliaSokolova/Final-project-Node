import express from "express";
import {
  getAllExs,
  createExs,
  // addToFavorites, 
  // getAllFavorites, 
  // deleteExs
} from "../controllers/exs.js";

const router = express.Router();


router.route("/").get(getAllExs);
router.route("/").post(createExs)

// router.delete("/:exsId", deleteExs);

export default router;