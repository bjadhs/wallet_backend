import sql from "../config/db.js";

export const getAllTransactions = async (req, res) => {
    try{
        const transactions = await sql `
            SELECT * FROM transactions
        `
        console.log(transactions);
        res.status(200).json(transactions);
    }catch(error){
        res.status(500).json({message: "Failed to fetch transactions", error: error.message});
    }
}
export const getTransactionById = async (req, res) => {
    try{
        const {userId} = req.params;
        const transaction = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId}
        `
        res.status(200).json(transaction);
    }catch(error){
        res.status(500).json({message: "Failed to fetch transaction", error: error.message});
    }
}
export const createTransaction = async (req, res) => {
    try{
        const {user_id, title, amount, category} = req.body;
        if(!user_id || !title || !amount || !category){
            return res.status(400).json({message: "All fields are required"});
        }
        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `
         res.status(201).json(transaction[0]);
    }catch(error){
        res.status(500).json({message: "Failed to create transaction", error: error.message});
    }
}
export const deleteTransaction = async (req, res) => {
    try{
        const {id} = req.params;
        if(isNaN(id)){
            return res.status(400).json({message: "Invalid user ID"});
        }
        const transaction = await sql`
            DELETE FROM transactions WHERE id = ${id}
            RETURNING *
        `
        if(transaction.length === 0){
            return res.status(404).json({message: "Transaction not found"});
        }
        res.status(200).json({message: "Transaction deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Failed to delete transaction", error: error.message});
    }
}

export const updateTransaction = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, amount, category} = req.body;
            if(!title || !amount || !category){
            return res.status(400).json({message: "All fields are required"});
        }
        const transaction = await sql`
            UPDATE transactions SET title = ${title}, amount = ${amount}, category = ${category} WHERE id = ${id}
        `
        res.status(200).json(transaction);
    }catch(error){
        res.status(500).json({message: "Failed to update transaction", error: error.message});
    }
}