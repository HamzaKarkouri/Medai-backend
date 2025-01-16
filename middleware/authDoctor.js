import jwt from 'jsonwebtoken';

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Get the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.body.docId = token_decode.id; // Attach decoded doctor ID to the request body
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

export default authDoctor;
