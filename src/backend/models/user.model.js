import db from '../config/db.js';

const Users = db.collection('users');

export const createUserProfile = async (uid, email) => {
    const userRef = Users.doc(uid);
    await userRef.set({
        uid,
        email,
        createdAt: new Date(),
    });
    return (await userRef.get()).data();
};

export const findUserById = async (uid) => {
    const doc = await Users.doc(uid).get();
    return doc.exists ? doc.data() : null;
};