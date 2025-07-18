import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';




const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
                console.log('user from auth state change->', currentUser);
            } else {
                console.log('user state from auth state->', currentUser);
                setUser(null);
            }
            setLoading(false);

            return () => {
                unSubscribe()
            }

        })
    }, []);

    const setUserProfile = object => {
        return updateProfile(auth.currentUser,object)
    }

    const userLogOut = ()=> {
        setLoading(true)
        return signOut(auth)
    }

    const signInWithGoogle = ()=> {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }


    const contextValue = {
        createUser,
        loginUser,
        user,
        loading,
        setUserProfile,
        userLogOut,
        signInWithGoogle
    }

    return <AuthContext value={contextValue}>
        {children}
    </AuthContext>
};

export default AuthProvider;