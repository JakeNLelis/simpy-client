import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../component/CreatePost";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.user.currentUser.token);

  const createPost = async (postData) => {
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newPost = response.data;
      setPosts([newPost, ...posts]);
    } catch (err) {
      setError(
        err.response.data.message ||
          "An error occurred while creating the post."
      );
    }
  };

  return (
    <section className="mainArea">
      <CreatePost onCreatePost={createPost} error={error} />
    </section>
  );
}

export default Home;
