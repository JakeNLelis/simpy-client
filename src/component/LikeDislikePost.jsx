import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";

function LikeDislikePost(props) {
  const [post, setPost] = React.useState(props.post);
  const userId = useSelector((state) => state.user.currentUser.id);
  const token = useSelector((state) => state.user.currentUser.token);
  const [postLiked, setPostLiked] = React.useState(
    post.likes?.includes(userId)
  );

  const handleLikeDislikePost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}/like`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error liking/disliking post:", error);
    }
  };

  const handleCheckIfUserLikedPost = () => {
    if (post.likes?.includes(userId)) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
  };

  useEffect(() => {
    handleCheckIfUserLikedPost();
  }, [postLiked, post]);

  return (
    <button className="feed__footer-comments" onClick={handleLikeDislikePost}>
      {postLiked ? <FcLike /> : <FaRegHeart />}
      <small>{post.likes.length}</small>
    </button>
  );
}

export default LikeDislikePost;
