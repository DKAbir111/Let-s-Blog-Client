import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            toast.success("Thank you for subscribing to our newsletter!");
            setEmail("");
        } else {
            toast.error("Please enter a valid email address.");
        }
    };

    return (
        <motion.section
            className="bg-[#888888] py-12 text-white font-lato"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto text-center px-6">
                <motion.h2
                    className="text-3xl font-semibold mb-6 font-lustria"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Subscribe to Our Newsletter
                </motion.h2>
                <motion.p
                    className="mb-8"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Stay updated with the latest blogs and news. Enter your email below:
                </motion.p>
                <form onSubmit={handleNewsletterSubmit} className="flex justify-center items-center">
                    <motion.input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 w-1/3 rounded-l-sm border-none text-black"
                        required
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    <motion.button
                        type="submit"
                        className="px-6 py-2 bg-[#222222] text-white rounded-r-sm"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Subscribe
                    </motion.button>
                </form>
            </div>
        </motion.section>
    );
};

export default Newsletter;
