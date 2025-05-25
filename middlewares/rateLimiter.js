import dotenv from 'dotenv';
import ratelimit from '../config/upstash.js';
dotenv.config();

const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await ratelimit.limit('my-rate-limit');
        if(!success){
            return res.status(429).json({message: "Too many requests, please try again later."});
        }
        next();
    }catch(error){
        res.status(500).json({message: "Rate limit error", error: error.message});
    }
}

export default rateLimiter;