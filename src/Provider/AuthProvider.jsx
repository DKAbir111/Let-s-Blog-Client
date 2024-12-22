import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import PropTypes from 'prop-types'
import auth from "../Firebase/Firebase.init";
import { useEffect, useState } from "react";
export default function AuthProvider({ children }) {

    // state observer
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, [])

    // create new user
    const createUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password);
    }

    // log in existing user
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        createUser,
        loginUser,
        user
    }
    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
