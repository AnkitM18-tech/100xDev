import { Post } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./PostCard";

const PostDescription = ({ post }: { post: Post }) => {
  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-center">
        <div className="grid w-full max-w-screen-xl grid-cols-12 py-10 px-28">
          <div className="col-span-8">
            <div className="text-4xl font-extrabold">{post.title}</div>
            <div className="pt-2 text-slate-500">Posted on 3rd Jan 2024</div>
            <div className="pt-2 tracking-wide">{post.content}</div>
          </div>
          <div className="col-span-4 pl-4 ml-4">
            <div className="text-lg text-slate-600">Author</div>
            <div className="flex">
              <div className="flex flex-col justify-center pr-2">
                <Avatar name={post.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {post.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Sonny Liston, he is Muhammad Ali with no Fighting License
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
