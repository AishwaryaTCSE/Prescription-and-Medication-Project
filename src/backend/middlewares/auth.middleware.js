import { auth } from '../config/firebase.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(token);
        // Attach user info to request
        req.user = { 
            uid: decodedToken.uid,
            email: decodedToken.email 
        };
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export default authMiddleware;