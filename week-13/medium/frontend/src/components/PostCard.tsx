import { Link } from "react-router-dom";

interface PostCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

const PostCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: PostCardProps) => {
  return (
    <Link to={`/post/${id}`}>
      <div className="w-screen max-w-screen-md p-4 m-4 tracking-wide border-b cursor-pointer border-slate-400">
        <div className="flex items-center">
          <Avatar name={authorName} />
          <div className="pr-2 font-base">{authorName}</div> - {publishedDate}
        </div>
        <div className="pt-2 text-xl font-semibold">{title}</div>
        <div className="font-thin text-md">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className="py-1 text-sm text-slate-600">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export const Avatar = ({ name, size = 6 }: { name: string; size?: number }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${size} h-${size} mr-2 overflow-hidden py-2 px-4 bg-black rounded-full`}
    >
      <span className="text-xs font-medium text-white">{name[0]}</span>
    </div>
  );
};

export default PostCard;
