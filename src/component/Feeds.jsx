import Feed from "./Feed";

function Feeds({ posts }) {
  return (
    <div className="feeds">
      {posts.length < 1 ? (
        <p className="center">No posts found.</p>
      ) : (
        posts.map((post) => (
          <Feed key={post._id} post={post} isPending={post.sending} />
        ))
      )}
    </div>
  );
}

export default Feeds;
