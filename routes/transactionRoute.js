import express from "express";
import { getAllTransactions, createTransaction, getTransactionById, deleteTransaction, updateTransaction } from "../controllers/transactionController.js";
const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:userId", getTransactionById);
router.post("/", createTransaction);
router.delete("/:userId", deleteTransaction);
router.put("/:id", updateTransaction);


export default router;