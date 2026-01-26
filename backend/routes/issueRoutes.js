import express from "express";
import {
  createIssue,
  getAllIssues,
  updateIssueStatus,
  getMyIssues,
} from "../controllers/issueController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Student
router.post("/", protect, createIssue);
router.get("/my", protect, getMyIssues); 

// Admin
router.get("/", protect, adminOnly, getAllIssues);
router.put("/:id", protect, adminOnly, updateIssueStatus);

export default router;