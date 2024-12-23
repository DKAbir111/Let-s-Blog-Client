import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

export default function PrivateRoutes({ children }) {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div>Loading...</div>
    }
    if (user?.email) {
        return children;
    }
    return (

        <Navigate to={'/auth/login'}>

        </Navigate>

    )
}
PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,
}
