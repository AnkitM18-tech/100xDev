import Appbar from "../components/Appbar";
import PostCard from "../components/PostCard";
import Skeleton from "../components/Skeleton";
import { usePosts } from "../hooks";

const Posts = () => {
  const { loading, posts } = usePosts();

  if (loading) {
    return (
      <div>
        <Appbar />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="">
          {posts.map((post) => (
            <PostCard
              id={post.id}
              key={post.id}
              authorName={post.author.name || "Anonymous"}
              title={post.title}
              content={post.content}
              publishedDate="Jan 3,2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
