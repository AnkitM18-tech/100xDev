import Appbar from "../components/Appbar";
import PostDescription from "../components/PostDescription";
import { Spinner } from "../components/Spinner";
import { usePost } from "../hooks";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { loading, post } = usePost({ id: id || "" });
  if (loading || !post) {
    return (
      <div>
        <Appbar />
        <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <PostDescription post={post} />
    </div>
  );
};

export default Post;
