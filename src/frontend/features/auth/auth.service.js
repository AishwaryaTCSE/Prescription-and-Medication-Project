import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

export const loginUser = async ({ email, password }) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: { uid: cred.user.uid, email: cred.user.email, displayName: cred.user.displayName || '' },
    };
  } catch (err) {
    return { success: false, message: mapFirebaseError(err) };
  }
};

export const signupUser = async ({ name, email, password }) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    return { success: true, user: { uid: cred.user.uid, email: cred.user.email, displayName: name || '' } };
  } catch (err) {
    return { success: false, message: mapFirebaseError(err) };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err) {
    return { success: false, message: mapFirebaseError(err) };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (err) {
    return { success: false, message: mapFirebaseError(err) };
  }
};

function mapFirebaseError(err) {
  const code = err?.code || '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'Email already in use.';
    case 'auth/weak-password':
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    default:
      return err?.message || 'Authentication error';
  }
}
