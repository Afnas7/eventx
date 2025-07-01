import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Cards({ item }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(item.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const likedEvents = JSON.parse(localStorage.getItem("likedEvents") || "{}");
      if (likedEvents[user.email]?.includes(item.id)) {
        setHasLiked(true);
      }
    }
  }, [user, item.id]);

  const handleLike = () => {
    if (!user) return toast.error("Please login to like this event");

    const likedEvents = JSON.parse(localStorage.getItem("likedEvents") || "{}");

    if (!likedEvents[user.email]) likedEvents[user.email] = [];

    if (likedEvents[user.email].includes(item.id)) {
      return toast.error("You already liked this event");
    }

    likedEvents[user.email].push(item.id);
    localStorage.setItem("likedEvents", JSON.stringify(likedEvents));

    setLikes(likes + 1);
    setHasLiked(true);
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
      setShowCommentBox(false);
    }
  };

  const toggleCommentsVisibility = () => setShowComments(!showComments);
  const toggleCommentBoxVisibility = () => setShowCommentBox(!showCommentBox);
  const handleDetailsClick = () => navigate(`/event-details/${item.id}`);

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 w-[300px] h-[450px] flex flex-col justify-between">
        <figure className="h-[200px] w-full overflow-hidden rounded-t-xl">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover rounded-t-xl"
          />
        </figure>

        <div className="card-body px-4 py-3 text-gray-900 dark:text-gray-100">
          <h2 className="card-title text-lg font-semibold">{item.name}</h2>
          <p className="text-sm">{item.title}</p>

          <div className="card-actions justify-between items-center mt-3">
            <button
              onClick={handleDetailsClick}
              className="px-3 py-1 rounded-full border text-sm border-gray-300 dark:border-gray-600 hover:bg-pink-500 hover:text-white duration-200"
            >
              Details
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                disabled={hasLiked}
                className={`px-2 py-1 rounded-full border text-sm ${
                  hasLiked ? "bg-gray-400 text-white cursor-not-allowed" : "hover:bg-red-500 hover:text-white"
                } duration-200 border-gray-300 dark:border-gray-600`}
              >
                ❤️ {likes}
              </button>

              <button
                onClick={toggleCommentBoxVisibility}
                className="px-2 py-1 rounded-full border text-sm border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white duration-200"
              >
                💬
              </button>
            </div>
          </div>

          {showCommentBox && (
            <form onSubmit={handleCommentSubmit} className="mt-3">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write a comment..."
                className="w-full p-2 border rounded-md text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          )}

          <div className="mt-2 text-sm">
            <span
              onClick={toggleCommentsVisibility}
              className="cursor-pointer text-blue-500 underline"
            >
              {showComments ? "Hide Comments" : "Show Comments"}
            </span>
            {showComments &&
              comments.map((cmt, i) => (
                <div key={i} className="border-t py-1 text-gray-800 dark:text-gray-200">
                  {cmt}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
