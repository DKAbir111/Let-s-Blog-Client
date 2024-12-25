import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { FaArrowLeft } from "react-icons/fa";

export default function BlogDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const blog = useLoaderData();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/comment/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.error(error));
  }, [comments.length, id]);


  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;

    const newComment = {
      blogId: id,
      userName: user?.displayName,
      userProfilePic: user?.photoURL,
      text: commentText,
    };

    axios
      .post("http://localhost:5001/api/comment", newComment)
      .then((response) => {
        setComments((prev) => [...prev, response.data]);
        setCommentText("");
      })
      .catch((error) => console.error(error));
  };


  const isOwner = user?.email && blog?.email === user.email;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {blog && (
        <div>

          <button
            onClick={() => navigate(-1)}
            className="bg-[#b28b51] text-white py-2 px-4 hover:bg-[#8d6c42] mb-4 rounded-sm"
          >
            <FaArrowLeft className="inline-block" /> Go Back
          </button>


          <img
            src={blog.imageUrl}
            alt="Blog Image"
            className="w-full h-80 object-cover rounded-lg"
          />
          <h1 className="text-3xl font-lustria mt-4">{blog.title}</h1>
          <p className="text-sm text-gray-500 mt-2">{blog.category}</p>
          <p className="text-gray-600 mt-4">{blog.shortDescription}</p>
          <p className="text-gray-600 mt-4">{blog.longDescription}</p>


          {isOwner && (
            <Link
              to={`/update-blog/${id}`}
              className="block bg-[#b28b51] text-white text-center py-2 px-4 mt-4 rounded-lg hover:bg-[#8d6c42]"
            >
              Update Blog
            </Link>
          )}


          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {isOwner ? (
              <p className="text-gray-500">You cannot comment on your own blog.</p>
            ) : (
              <div>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#b28b51]"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="bg-[#b28b51] text-white py-2 px-4 mt-2  hover:bg-[#8d6c42] rounded-sm"
                  onClick={handleCommentSubmit}
                >
                  Submit Comment
                </button>
              </div>
            )}


            <div className="mt-6 space-y-4">
              <h2 className="italic font-semibold">Comments</h2>
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="border border-gray-200 p-2 rounded-lg flex gap-2">
                    <img
                      src={comment.userProfilePic}
                      alt="User Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{comment.userName}</p>
                      <p className="text-gray-600">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
