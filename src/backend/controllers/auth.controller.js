import { auth } from '../config/firebase.js';
import { createUserProfile } from '../models/user.model.js';

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Create user in Firebase Authentication
    const userRecord = await auth.createUser({ email, password });

    // 2. Create user profile in Firestore
    const userProfile = await createUserProfile(userRecord.uid, email);

    // 3. Generate initial token (Client exchanges this for an ID token)
    const token = await auth.createCustomToken(userRecord.uid);

    res.status(201).json({ 
        message: 'User registered successfully.',
        token,
        user: { uid: userRecord.uid, email: userRecord.email }
    });
});

export const login = asyncHandler(async (req, res) => {
    const { email } = req.body; // Assuming password validation happens client-side or via another service

    // Check if user exists
    const user = await auth.getUserByEmail(email).catch(() => null);

    if (!user) {
         return res.status(401).json({ message: 'Invalid credentials or user not found.' });
    }

    // Generate custom token for client to sign in and get an ID token
    const token = await auth.createCustomToken(user.uid);

    res.status(200).json({ 
        message: 'Login successful.',
        token,
        user: { uid: user.uid, email: user.email }
    });
});