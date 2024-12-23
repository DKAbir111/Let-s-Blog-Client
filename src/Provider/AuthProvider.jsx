import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import PropTypes from 'prop-types'
import auth from "../Firebase/Firebase.init";
import { useEffect, useState } from "react";
export default function AuthProvider({ children }) {

    // state observer
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser)
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])

    // create new user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // log in existing user
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign in with google
    const googleSignin = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    //logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const authInfo = {
        createUser,
        loginUser,
        user,
        googleSignin,
        logOut,
        loading
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
