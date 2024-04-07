import axios from "axios";

async function getUserDetails() {
  await new Promise((r) => setTimeout(r, 5000));
  // const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
  // return response.data;
  try {
    // bad pattern -> we are sending a request to nextjs server to nextjs server. we should return directly here.
    const response = await axios.get("http://localhost:3000/api/user");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// async component - NextJs now supports async component. before we use to get server side props and all.
export default async function Home() {
  // during the data fetching(async operation at the top of your file), if it takes longer than expected to be fetched, loading.tsx will be rendered. Opinionated by Next JS.
  // Whatever route we think is going to get stuck, we need to add loading.tsx there.
  const userData = await getUserDetails();
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="p-8 border rounded">
          <div>Name: {userData?.name}</div>
          {userData?.email}
        </div>
      </div>
    </div>
  );
}

// we can write async component inside server side components only.
