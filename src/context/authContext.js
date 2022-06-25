import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth }  from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


const AuthContext = createContext();

export const GetAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const value = {
        isLoading,
        currentUser,
        signup,
        login ,
        logout
    };

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setIsLoading(false);
        });
        
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}