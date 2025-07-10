/* eslint-disable react-hooks/exhaustive-deps */
import {
  Suspense,
  useMemo,
  useOptimistic,
  startTransition,
  useState,
} from "react";
import { useSelector } from "react-redux";
import CreatePost from "../component/CreatePost";
import Feeds from "../component/Feeds";
import { getPosts, createPost } from "../api/post";
import PostsLoader from "../component/PostsLoader";

function Home() {
  const token = useSelector((state) => state.user.currentUser.token);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [posts, setPosts] = useState([]);

  const postsPromise = getPosts(token);

  // React 19 useOptimistic for immediate UI updates
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [
      {
        ...newPost,
        sending: true,
      },
      ...state,
    ]
  );

  // Enhanced create post function with optimistic updates
  const handleCreatePost = async (postData) => {
    const optimisticPost = {
      _id: `temp-${Date.now()}`,
      body: postData.get("body"),
      image: postData.get("image")
        ? URL.createObjectURL(postData.get("image"))
        : null,
      // Match the server response structure exactly
      creator: {
        _id: currentUser.id,
        fullName: currentUser.name,
        profilePhoto: currentUser.profilePhoto,
      },
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
    };

    // Add optimistic post immediately
    addOptimisticPost(optimisticPost);

    startTransition(async () => {
      try {
        const newPost = await createPost(postData, token);

        const completePost = {
          ...newPost,
          creator: {
            ...newPost.creator,
            profilePhoto:
              newPost.creator.profilePhoto || currentUser.profilePhoto,
            fullName: newPost.creator.fullName || currentUser.name,
          },
        };

        startTransition(() => {
          setPosts((currentPosts) => [completePost, ...currentPosts]);
        });
      } catch (error) {
        console.error("Error creating post:", error);
        startTransition(() => {
          setPosts((currentPosts) => currentPosts);
        });
      }
    });
  };

  return (
    <section className="mainArea">
      <CreatePost onCreatePost={handleCreatePost} />
      <Suspense
        fallback={
          <div>
            <span className="spinner"></span>
            Loading posts...
          </div>
        }
      >
        <PostsLoader postsPromise={postsPromise} setPosts={setPosts} />
        <Feeds posts={optimisticPosts} />
      </Suspense>
    </section>
  );
}

export default Home;
