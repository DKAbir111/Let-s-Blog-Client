import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';

export default function Register() {
    const { createUser } = useContext(AuthContext)
    const imageRef = useRef(null)
    const navigate = useNavigate()
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
    // Toggle password visibility
    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasDigit = /\d/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
        if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
        if (!hasSpecialChar) return "Password must contain at least one special character.";
        if (!hasDigit) return "Password must contain at least one digit.";
        if (!isValidLength) return "Password must be at least 6 characters long.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const validationError = validatePassword(password);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        const newUser = { username, email, password, photo: imageUrl };
        console.log(newUser);

        createUser(email, password)
            .then((result) => {
                if (result) {
                    updateProfile(auth.currentUser, {
                        displayName: username,
                        photoURL: imageUrl,
                    });
                    toast.success("Account created successfully!");
                    e.target.reset();
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
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
                            defaultValue={imageUrl}
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
                    </div>
                    <input type="file" ref={imageRef} placeholder="Enter photo URL" name='photo' onChange={handleFileUpload} className="hidden" required />
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn bg-[#b28b51] border-none text-white w-full py-3 rounded-sm"
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