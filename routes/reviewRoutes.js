import express from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/").post(createReview).get(getReviews);
router.route("/:id").get(getReviewById).delete(deleteReview);

export default router;
