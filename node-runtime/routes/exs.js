import express from "express";
import {
  getAllExs,
  addToFavorites,
  getAllFavorites,
  deleteFavorites,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
} from "../controllers/exs.js";

const router = express.Router();


router.route("/").get(getAllExs)
router.route("/all").get(getAllFavorites);
router.route("/").post(addToFavorites);
router.route("/").delete(deleteFavorites);
router.route("/activity").post(createActivity).get(getAllActivities);
router.route("/activity/:id").patch(updateActivity)
router.route("/activity/:id").delete(deleteActivity)



export default router;