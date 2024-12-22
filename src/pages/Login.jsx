import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();

    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    // Toggle password visibility
    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('https://japanese-learing-server.vercel.app/api/auth/login', { email, password });

            const { token, role } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', role);

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-base-200 min-h-screen  flex justify-center items-center font-lato">
            <div className="card bg-white shadow-lg rounded-sm p-8 w-full max-w-md">
                <h2 className="text-2xl text-center text-[#b28b51] mb-6 font-lustria font-bold">
                    Login
                </h2>

                <form className="space-y-6" onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label text-sm font-semibold text-[#b28b51]">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered rounded-sm w-full py-3 px-4 border-[#b28b51] focus:outline-none focus:border-[#b28b51]"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-control">
                        <label className="label text-sm font-semibold text-[#b28b51]">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input input-bordered rounded-sm w-full py-3 px-4 border-[#b28b51] focus:outline-none focus:border-[#b28b51]"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b28b51]"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <label className="label mt-2">
                            <a href="#" className="label-text-alt link link-hover text-[#b28b51]">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* Login Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-[#b28b51] border-none text-white w-full py-3 rounded-sm">
                            Login
                        </button>
                    </div>
                </form>

                {/* Register Link */}
                <div className="mt-4 text-center">
                    <small className="text-sm text-gray-600">
                        Don&apos;t have an account?
                        <Link to="/auth/register" className="underline text-[#b28b51] ml-1">Register</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}