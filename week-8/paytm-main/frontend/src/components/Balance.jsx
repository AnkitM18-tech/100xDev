export const Balance = ({ value }) => {
  return (
    <div className="flex">
      <div className="text-lg font-bold">Your Balance:</div>
      <div className="ml-4 text-lg font-semibold">₹ {value}</div>
    </div>
  );
};
