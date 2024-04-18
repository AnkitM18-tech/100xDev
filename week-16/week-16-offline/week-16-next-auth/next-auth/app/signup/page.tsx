export default function () {
  return (
    <div className="flex flex-col items-center justify-between mt-20">
      Sign Up
      <div className="flex flex-col">
        <input
          className="p-2 mt-8 rounded-lg"
          type="text"
          placeholder="UserName"
        />
        <input
          className="p-2 mt-8 rounded-lg"
          type="Password"
          placeholder="Password"
        />
        <button className="p-2 mt-8 border-2 rounded-lg">Submit</button>
      </div>
    </div>
  );
}
