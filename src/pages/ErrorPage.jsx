import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
                {/* Error Message */}
                <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
                <p className="text-lg text-gray-600 mb-6">Something went wrong. The page you are looking for does not exist.</p>

                {/* Go Back Button */}
                <Link
                    to="/"
                    className="flex gap-2 items-center justify-center px-6 py-3 bg-[#b28b51] text-white rounded-sm font-semibold hover:bg-[#9e7c45] transition duration-300"
                >
                    <BiArrowBack />  Go Back to Home
                </Link>
            </div>
        </div>
    );
}
