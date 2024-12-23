import { useState } from "react";
import { toast } from "react-toastify";

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
        <section className="bg-[#888888] py-12 text-white font-lato">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-3xl font-semibold mb-6 font-lustria">Subscribe to Our Newsletter</h2>
                <p className="mb-8">Stay updated with the latest blogs and news. Enter your email below:</p>
                <form onSubmit={handleNewsletterSubmit} className="flex justify-center items-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 w-1/3 rounded-l-sm border-none text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#222222] text-white rounded-r-sm"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
