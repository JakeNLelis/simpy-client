import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ProfileImage from "../component/ProfileImage";
import { useSelector } from "react-redux";
import TimeAgo from "react-time-ago";
import LikeDislikePost from "../component/LikeDislikePost";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdSend, IoMdShare } from "react-icons/io";
import BookmarksPost from "../component/BookmarksPost";
import PostComment from "../component/PostComment";

function SingePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null); // Changed to null instead of {}
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.user.currentUser.token);

  const getPost = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPost(response.data);
      // Set comments from post data instead of separate API call
      setComments(response.data.comments || []);
      console.log("Post with comments:", response.data);
    } catch (error) {
      console.error("Error fetching post data:", error);
      setError("Failed to load post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove or comment out the separate getComments function
  // const getComments = async () => { ... }

  const createComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${id}`,
        { comment },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Comment created:", response.data);
      // setComments((prevComments) => [response.data, ...prevComments]);
      getPost();
      setComment("");
      setError("");
    } catch (error) {
      console.error("Error creating comment:", error);
      setError("Failed to post comment. Please try again.");
    }
  };

  useEffect(() => {
    if (id && token) {
      getPost();
    }
  }, [id, token]);

  // Loading state
  if (isLoading) {
    return (
      <section className="singlePost">
        <div>Loading post...</div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="singlePost">
        <div className="error-message">{error}</div>
      </section>
    );
  }

  // No post found
  if (!post) {
    return (
      <section className="singlePost">
        <div>Post not found.</div>
      </section>
    );
  }

  return (
    <section className="singlePost">
      <header className="feed__header">
        <Link
          to={`/users/${post.creator?._id}`}
          className="feed__header-profile"
        >
          <ProfileImage image={post.creator?.profilePhoto} />
          <div>
            <h4>{post.creator?.fullName}</h4>
            <small>
              <TimeAgo date={post.createdAt} />
            </small>
          </div>
        </Link>
      </header>
      <div className="feed__body">
        <p>{post.body}</p>
        {post.image && <img src={post.image} alt="Post" />}
      </div>
      <footer className="feed__footer">
        <div>
          {post.likes && <LikeDislikePost post={post} />}
          <button className="feed__footer-comments">
            <FaRegCommentDots />
          </button>
          <button className="feed__footer-comments">
            <IoMdShare />
          </button>
        </div>
        <BookmarksPost post={post} />
      </footer>
      <ul className="singlePost__comments">
        <form className="singlePost__comments-form" onSubmit={createComment}>
          <textarea
            name=""
            id=""
            placeholder="Enter your comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <button type="submit" className="singlePost__comments-btn">
            <IoMdSend />
          </button>
        </form>
        {/* Debug: Add this to see what's in comments */}
        {console.log("Comments state:", comments)}
        {/* Try both approaches: */}
        {comments.length > 0 ? (
          comments.map((c) => {
            console.log("Individual comment:", c); // Debug log
            return <PostComment key={c._id} comment={c} />;
          })
        ) : (
          <li>No comments yet.</li>
        )}
      </ul>
    </section>
  );
}

export default SingePost;
