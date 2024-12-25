import axios from "axios";
import { useEffect, useState } from "react";

const VividImpressions = () => {
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/comments/random')
            .then(res => {
                setCommentData(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    console.log(commentData);

    return (
        <section className="bg-gray-100 py-12 px-6">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-6 text-gray-900">Vivid Impressions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-28 md:gap-16 gap-7">
                    {commentData.map((comment) => (
                        <div key={comment._id} className="bg-white p-6 rounded-sm shadow-sm border-l-8 border-[#b28b51]">
                            <div className="flex flex-col items-center space-x-4 justify-center">
                                {/* User Profile */}
                                <img
                                    src={comment.userProfilePic}
                                    alt={comment.userName}
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{comment.userName}</h3>
                                </div>
                            </div>

                            <div className="mt-4 text-gray-700">
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VividImpressions;
