export const Signup = () => {
  return (
    <div
      style={{
        width: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 400,
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "10px",
        }}
      >
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Submit</button>
      </div>
    </div>
  );
};
