import axios from "axios";
import React, { useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";

function BookmarksPost({ post }) {
  const [user, setUser] = React.useState({});
  const [postBookmarked, setPostBookmarked] = React.useState(
    user.bookmarks?.includes(post._id)
  );
  const token = useSelector((state) => state.user.currentUser.token);
  const userId = useSelector((state) => state.user.currentUser.id);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const createBookmark = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}/bookmark`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.bookmarks?.includes(post._id)) {
        setPostBookmarked(true);
      } else {
        setPostBookmarked(false);
      }
    } catch (error) {
      console.error("Error creating bookmark:", error);
    }
  };

  return (
    <button className="feed__footer-bookmark" onClick={createBookmark}>
      {postBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}

export default BookmarksPost;
