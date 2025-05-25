import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sql from "./config/db.js";
import transactionRoutes from "./routes/transactionRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/transactions', transactionRoutes);

app.get("/health", (req, res) => {
  res.send("Hello World");
});

async function initDB() {
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    console.log("Database initialized successfully");
    }catch(error){
        console.error("Error initializing database", error);
        process.exit(1);
    }
}

const PORT = process.env.PORT || 3000;

initDB().then(()=>
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        })
)
