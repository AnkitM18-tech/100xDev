import { Link } from "react-router-dom";
import { Avatar } from "./PostCard";

const Appbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-4 border-b">
      <Link to="/posts">
        <div className="text-2xl font-bold text-green-500 cursor-pointer">
          Hard 🚀
        </div>
      </Link>
      <div>
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Create New +
          </button>
        </Link>
        <Avatar size={10} name="Rashmika" />
      </div>
    </div>
  );
};

export default Appbar;
