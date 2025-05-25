import express from "express";
import { getAllTransactions, createTransaction, getTransactionById, deleteTransaction, updateTransaction, getSummary } from "../controllers/transactionController.js";
const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:userId", getTransactionById);
router.post("/", createTransaction);
router.delete("/:userId", deleteTransaction);
router.put("/:id", updateTransaction);
router.get("/summary/:userId", getSummary);


export default router;