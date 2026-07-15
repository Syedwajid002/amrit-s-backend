import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
const createReview = asyncHandler(async (req, res) => {
  const { customerName, rating, description } = req.body;

  if (!customerName || customerName.trim() === "") {
    res.status(400);
    throw new Error("Customer name is required");
  }

  if (rating === undefined || rating === null || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Rating must be a number between 1 and 5");
  }

  if (!description || description.trim() === "") {
    res.status(400);
    throw new Error("Description is required");
  }

  const review = await Review.create({
    customerName: customerName.trim(),
    rating,
    description: description.trim(),
  });

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc    Get all reviews (latest first)
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

// @desc    Get a single review by ID
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc    Delete a review by ID
// @route   DELETE /api/reviews/:id
// @access  Public (admin auth to be added in future)
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  await Review.deleteOne({ _id: review._id });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

export { createReview, getReviews, getReviewById, deleteReview };
