import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

export default function PrivateRoutes({ children }) {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div className="flex justify-center items-center  text-[#b28b51]">
            <span className="loading loading-bars loading-md"></span>
        </div>
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
