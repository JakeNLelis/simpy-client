/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import TimeAgo from "react-time-ago";
import { useSelector } from "react-redux";
import { FaRegCommentDots } from "react-icons/fa";
import LikeDislikePost from "./LikeDislikePost";
import { IoMdShare } from "react-icons/io";
import TrimText from "../helpers/TrimText";
import BookmarksPost from "./BookmarksPost";

function Feed({ post, isPending }) {
  const userId = useSelector((state) => state.user.currentUser.id);
  const creator = post.creator;
  const [showFeedHeaderMenu, setShowFeedHeaderMenu] = React.useState(false);

  const location = useLocation();

  return (
    <article className={`feed ${isPending ? "feed--pending" : ""}`}>
      {isPending && <div className="feed__pending-indicator">Posting...</div>}
      <header className="feed__header">
        <Link to={`/users/${creator._id}`} className="feed__header-profile">
          <ProfileImage image={post.creator.profilePhoto} />
          <div>
            <h4>{post.creator.fullName}</h4>
            <small>
              <TimeAgo date={post.createdAt} />
            </small>
          </div>
        </Link>
        {showFeedHeaderMenu &&
          creator._id === userId &&
          location.pathname.includes("users") && (
            <menu className="feed__headermenu">
              <button onClick={showEditPostModal}></button>
              <button onClick={deletePost}></button>
            </menu>
          )}
      </header>
      <Link to={`/posts/${post._id}`} className="feed__body">
        <p>
          <TrimText item={post.body} maxLength={160} />
        </p>
        {post.image && <img src={post.image} alt="Post" />}
      </Link>
      <footer className="feed__footer">
        <div>
          <LikeDislikePost post={post} />
          <button className="feed__footer-comments">
            <Link to={`/posts/${post._id}`}>
              <FaRegCommentDots />
            </Link>
            <small>{post.comments.length}</small>
          </button>
          <button className="feed__footer-share">
            <IoMdShare />
          </button>
        </div>
        <BookmarksPost post={post} />
      </footer>
    </article>
  );
}

export default Feed;
