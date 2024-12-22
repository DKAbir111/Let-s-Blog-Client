import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';

export default function Register() {
    const navigate = useNavigate();
    const imageRef = useRef(null)
    const [imageUrl, setImageURl] = useState('')
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file)
        try {
            fetch('https://api.imgbb.com/1/upload?key=5c73e82c6c39c531a41a2361f2681168', {
                method: 'POST',
                body: formData

            }).then(res => res.json())
                .then(data => {
                    setImageURl(data.data.
                        display_url)

                })

        } catch (err) {
            console.error(err);
            return;
        }
    }
    // State to manage password visibility and validation
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    // Toggle password visibility
    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    // Handle password input and validate length
    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        setIsPasswordValid(passwordValue.length >= 6); // Password validation (at least 6 characters)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.name.value;
        const email = e.target.email.value;
        // const photo = e.target.photo.value;
        const newUser = { username, email, password, photo: imageUrl };

        // Send a POST request to your backend
        try {
            const response = await axios.post('https://japanese-learing-server.vercel.app/api/auth/register', newUser);
            if (response.data) {
                toast.success('User Successfully Registered');
            }
            navigate('/');
        } catch (error) {
            console.error('Error during registration:', error.response?.data || error.message);
            navigate('/register');
        }
    };

    return (
        <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center font-lato">
            <div className="card bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#b28b51] mb-6 font-lustria">
                    Register
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="form-control">
                        <label className="label text-sm font-semibold text-[#b28b51]">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="input input-bordered w-full py-3 px-4 border-[#b28b51] focus:outline-none focus:border-[#b28b51] rounded-sm"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label text-sm font-semibold text-[#b28b51]">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full py-3 px-4 border-[#b28b51] focus:outline-none focus:border-[#b28b51] rounded-sm"
                            required
                        />
                    </div>

                    {/* Photo URL Input */}
                    <div className="form-control relative">
                        <label className="label text-sm font-semibold text-[#b28b51]">Profile Picture URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            name='photo'
                            placeholder="Provide a profile picture URL"
                            className="input input-bordered w-full py-3 px-4 border-[#b28b51] focus:outline-none focus:border-[#b28b51] rounded-sm"
                            required
                        />
                        <div className='absolute right-0 btn text-xl btn-ghost top-9 rounded-sm' onClick={() => imageRef.current.click()}><FaFileUpload /> </div>
                    </div>

                    {/* Password Input */}
                    <div className="form-control">
                        <label className="label text-sm font-semibold text-[#b28b51]">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Create a password"
                                className="input input-bordered w-full py-3 px-4 border-[#b28b51] focus:outline-none focus:border-[#b28b51] rounded-sm"
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
                        {!isPasswordValid && (
                            <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters long</p>
                        )}
                    </div>
                    <input type="file" ref={imageRef} placeholder="Enter photo URL" name='photo' onChange={handleFileUpload} className="hidden" required />
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn bg-[#b28b51] border-none text-white w-full py-3 rounded-sm"
                            disabled={!isPasswordValid}
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <small className="text-sm text-gray-600">
                        Already have an account?
                        <Link to="/auth/login" className="underline text-[#b28b51] ml-1">Login</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}