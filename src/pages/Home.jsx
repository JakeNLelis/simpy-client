/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../component/CreatePost";
import axios from "axios";
import Feeds from "../component/Feeds";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Handle successful response
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [setPosts]);

  console.log(posts);

  return (
    <section className="mainArea">
      <CreatePost onCreatePost={createPost} error={error} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Feeds posts={posts} onSetPosts={setPosts} />
      )}
    </section>
  );
}

export default Home;
