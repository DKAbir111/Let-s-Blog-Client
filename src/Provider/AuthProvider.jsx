import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import PropTypes from 'prop-types'
import auth from "../Firebase/Firebase.init";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function AuthProvider({ children }) {

    // state observer
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser?.email) {
                const user = { email: currentUser.email }
                axios.post('https://full-stack-job-portal-server.onrender.com/jwt', user, {
                    withCredentials: true,
                })
                    .then(res => {

                        if (res.data) {
                            setLoading(false);
                        }
                    })
            }

            else {
                axios.post('https://full-stack-job-portal-server.onrender.com/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('logout', res.data);
                        setLoading(false);
                    })
            }
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
    const addWishList = (id, email) => {
        axios.post('https://full-stack-job-portal-server.onrender.com/api/wishlist', { blogId: id, email: email })
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Successfully add to wishlist')
                }
            })
            .catch(err => {
                toast.error('Failed to add to wishlist')
                console.error(err)
            })
    }
    const authInfo = {
        createUser,
        loginUser,
        user,
        googleSignin,
        logOut,
        loading,
        addWishList
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
