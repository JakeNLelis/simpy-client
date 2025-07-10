import { use, useEffect, startTransition } from "react";

function PostsLoader({ postsPromise, setPosts }) {
  const fetchedPosts = use(postsPromise);

  useEffect(() => {
    if (fetchedPosts) {
      startTransition(() => {
        setPosts(fetchedPosts);
      });
    }
  }, [fetchedPosts, setPosts]);

  return null;
}

export default PostsLoader;
