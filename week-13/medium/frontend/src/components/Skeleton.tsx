const Skeleton = () => {
  return (
    <div className="flex justify-center my-4">
      <div
        role="status"
        className="w-screen max-w-screen-md p-4 m-4 tracking-wide border-b cursor-pointer animate-pulse border-slate-400"
      >
        <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Skeleton;
