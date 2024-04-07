This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```

Next.js is a full stack framework.This means the same process can handle frontend and backend code.

Why?
Single codebase for all your codebase
No cors issues, single domain name for your FE and BE
Ease of deployment, deploy a single codebase

In React =>

Waterfalls

Browser ->https://---- -> CDN
        <-------------- index.html
        ---------------> Get JS File
        <---------------

Browser --> https://--/api/v1/posts -> Backend Server

In Next JS =

Data fetching in Next
Ref - https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating

You can do the same thing as the last slide in Next.js, but then you lose the benefits of server side rendering

You should fetch the user details on the server side and pre-render the page before returning it to the user.

Assuming there is another BE that exists

Browser - Next.js server - BE server
Give me user card page ->  -> Give me users details
Returns HTML page with user details <- <- returns user json

We don't want waterfalling like React, we want our data to be pre-rendered on the first request itself. - we want nextjs to do server side rendering => fetch data from BE and put it in HTML and return it.

Loaders in Next ->

What if the getUserDetails call takes 5s to finish (lets say the backend is slow). You should show the user a loader during this time

loading.tsx file

Just like page.tsx and layout.tsx , you can define a skeleton.tsx file that will render until all the async operations finish

Create a loading.tsx file in the root folder

Add a custom loader inside

e.g
export default function Loading() {
    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            Loading...
        </div>
    </div>
  }


NextJS lets you write backend routes, just like express does.

This is why Next is considered to be a full stack framework.

The benefits of using NextJS for backend includes -
- Code in a single repo

- All standard things you get in a backend framework like express

- Server components can directly talk to the backend

---

Let’s move the backend into our own app
We want to introduce a route that returns hardcoded values for a user’s details (email, name, id)

Opinionated Convention ->

- Introduce a new folder called api (can be any other folder name but it should consist route.tsx /.ts)

- Add a folder inside called user

- Add a file inside called route.ts
Initialize a GET route inside it

export async function GET() {
  return Response.json({ username: "harkirat", email: "harkirat@gmail.com" })
}

Try replacing the api call in page.tsx to hit this URL

async function getUserDetails() {
  try {
    const response = await axios.get("http://localhost:3000/api/user")
	  return response.data;
  }  catch(e) {
    console.log(e);
  }
}
💡
This isn’t the best way to fetch data from the backend. We’ll make this better as time goes by

page.tsx => interpreted as a frontend
route.tsx => interpreted as a backend




```
