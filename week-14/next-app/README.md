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

---

NextJS was a framework that was introduced because of some minor inconviniences in React

- In a React project, you have to maintain a separate Backend project for your API routes

- React does not provide out of the box routing (you have to use react-router-dom)

- React is not SEO Optimised
  not exactly true today because of React Server components

- Waterfalling problem

---

```

SEO Optimisation

Google/Bing has a bunch of crawlers that hit websites and figure out what the website does.
It ranks it on Google based on the HTML it gets back
The crawlers DONT usually run your JS and render your page to see the final output.
While Googlebot can run JavaScript, dynamically generated content is harder for the scraper to index

Try visiting a react website =>

What does the Googlebot get back when they visit a website written in react?

Try visiting https://blog-six-tan-47.vercel.app/signup

Googlebot has no idea on what the project is. It only sees Vite + React + TS in the original HTML response.
Ofcourse when the JS file loads eventually, things get rendered but the Googlebot doesn’t discover this content very well.

```

```

Waterfalling problem =>

Let’s say you built a blogging website in react, what steps do you think the request cycle takes?

- Fetching the index.html from the CDN
- Fetching script.js from CDN
- Checking if user is logged in (if not, redirect them to /login page)
- Fetching the actual blogs

There are 4 round trips that happen one after the other (sequentially)
💡
The "waterfalling problem" in React, and more broadly in web development, refers to a scenario where data fetching operations are chained or dependent on each other in a way that leads to inefficient loading behavior.

```

```

Next.js offerings =>

Next.js provides you the following upsides over React =>

- Server side rendering - Get’s rid of SEO problems

- API routes - Single codebase with frontend and backend

- File based routing (no need for react-router-dom)

- Bundle size optimisations, Static site generation

- Maintained by the Vercel team

Downsides -
- Can’t be distributed via a CDN, always needs a server running that does server side rendering and hence is expensive.

- Very opinionated, very hard to move out of it

Let’s bootstrap a simple Next app ->

npx create-next-app@latest
TS, ESLint, Tailwind, App Router - Yes
else No

next.config.mjs - Nextjs configuration file

tailwind.config.js - Tailwind configuration file

app - Contains all your code/components/layouts/routes/apis

Bootstrap the project -

Remove everything from app/page.tsx and return an empty div

Remove the css bits (not the tailwind headers) from the global.css file

Routing in Next.js =>

Next.js has a file based router (https://nextjs.org/docs/app/building-your-application/routing/defining-routes)

This means that the way you create your files, describes what renders on a route

Let’s add a new folder in app called signup

Let’s add a file called page.tsx inside app/signup

npm run dev

Server side rendering =>

Let’s try exploring the response from the server on the /signup route

Run npm run dev

Visit http://localhost:3000/signup
Notice the response you get back in your HTML file

Now if GoogleBot tries to scrape your page, it’ll understand that this is a signup page without running any Javascript.

The first index.html file it get’s back will have context about the page since it was server side rendered

```

```

What are layouts

Layouts let you wrap all child pages inside some logic.suppose the root layout can contain the Appbar component and render other components, so that we don't have to rewrite the code in every page.

Merging routes -

What if you wan’t to get the banner in both signup and signin?

Approach #1

Move both the signin and signup folder inside a auth folder where we have the layout

You can access the routes at
http://localhost:3000/auth/signup and http://localhost:3000/auth/signin

Approach #2

You can use create a new folder with () around the name.
This folder is ignored by the router.

You can access the routes at
http://localhost:3000/signup and http://localhost:3000/signin


components directory ->

You should put all your components in a components directory and use them in the app routes rather than shoving everything in the route handler

Create a new folder called components in the root of the project
Add a new component there called Signin.tsx
Move the signin logic there
Render the Signin component in app/(auth)signin/page.tsx


```

```

Now try adding a onclick handler to the button on the signin page

<button onClick={() => {
    console.log("User clicked on signin")
}} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>

You will notice an error when you open the page

Client and server components =>

Ref - https://nextjs.org/learn/react-foundations/server-and-client-components

NextJS expects you to identify all your components as either client or server

As the name suggests

- Server components are rendered on the server
- Client components are pushed to the client to be rendered

By default, all components are server components.

If you wan’t to mark a component as a client component, you need to add the following to the top of the component -

"use client"


When should you create client components ?

- Whenever you get an error that tells you that you need to create a client component

- Whenever you’re using something that the server doesn’t understand (useEffect, useState, onClick…)

Rule of thumb is to defer the client as much as possible

Some nice readings -
https://github.com/vercel/next.js/discussions/43153


```
