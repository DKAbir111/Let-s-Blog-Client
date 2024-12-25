import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';
import { MdFileUpload } from 'react-icons/md';

export default function Register() {
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [photo, setPhoto] = useState('')
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


    const handleRegister = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photo = event.target.photo.value;
        const password = event.target.password.value;


        const validationError = validatePassword(password);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        createUser(email, password)
            .then((result) => {
                if (result) {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: photo,
                    });
                    toast.success("Account created successfully!");
                    event.target.reset();
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const ImageRef = useRef(null)

    const handlePhotoUpload = (e) => {
        const photo = e.target.files[0];
        if (!photo) return;
        const formData = new FormData();
        formData.append('image', photo);

        fetch('https://api.imgbb.com/1/upload?key=5c73e82c6c39c531a41a2361f2681168', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPhoto(data.data.display_url);
            })
            .catch((err) => {
                console.error('Error uploading image:', err);
                toast.error('Image upload failed');
            });
    };


    return (
        <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center font-lato">
            <div className="card bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#b28b51] mb-6 font-lustria">
                    Register
                </h2>

                <form className="space-y-6" onSubmit={handleRegister}>
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
                            defaultValue={photo}
                            name='photo'
                            placeholder="Provide a profile picture URL"
                            className="input input-bordered w-full py-3 px-4 border-[#b28b51] focus:outline-none focus:border-[#b28b51] rounded-sm"
                            required
                        />
                        <input type="file" className='hidden' name='file' ref={ImageRef} onChange={handlePhotoUpload} />
                        <span onClick={() => ImageRef.current.click()} className='btn btn-sm absolute bg-white shadow-none  border-none right-1 top-11'><MdFileUpload /></span>
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