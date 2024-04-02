```
npm install
npm run dev
```

```
npm run deploy
```

Creating a middleware in hono is well documented - https://hono.dev/guides/middleware

```

1. Limiting the middleware
To restrict a middleware to certain routes, you can use the following -

app.use('/message/*', async (c, next) => {
  await next()
})

In our case, the following routes need to be protected -

app.get('/api/v1/blog/:id', (c) => {})

app.post('/api/v1/blog', (c) => {})

app.put('/api/v1/blog', (c) => {})

So we can add a top level middleware

app.use('/api/v1/blog/*', async (c, next) => {
  await next()
})

```

```

How to pass data from middleware to the route handler?
Using the context - https://hono.dev/api/context

set() / get()

Set the value specified by the key with set and use it later with get.

app.use(async (c, next) => {
    c.set("message", "Hono Hobo!")
    await next();
})

app.get("/", (c) => {
    const message = c.get("message");
    return c.text(`The message is "${message}"`);
})

Pass the Variables as Generics to the Constructor of Hono to make it type-safe.

type Variables = {
    message: string
}

const app = new Hono<{ Variables: Variables }>()



How to make sure the types of variables that are being passed is correct?

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables : {
        userId: string
    }
}>();

app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id); -> the variable is set in the context so that it can be used later.
	await next()
})


3. Confirm that the user is able to access authenticated routes

app.post('/api/v1/blog', (c) => {
	console.log(c.get('userId'));
	return c.text('signin route')
})

Send the Header from Postman and ensure that the user id gets logged on the server


```

```

Callout
💡
If you want, you can extract the prisma variable in a global middleware that set’s it on the context variable

const app = new Hono<{
    // Bindings for Environment variables
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    // Variables for added variables via c.set()
    Variables : {
        prisma: any
    }
}>();


app.use(”*”, (c) => {
	const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set(”prisma”, prisma);
})


in routes => const prisma = c.get("prisma");


Ref https://stackoverflow.com/questions/75554786/use-cloudflare-worker-env-outside-fetch-scope


```

If you are using a Node.js based edge environment, then the pooled connection will work fine with neon.db pool url.

If you are using a different js runtime (AWS Lambda / Cloudflare Workers) -> is when neon.tech pool connection might not work. So we are connecting to the prisma connection pool using prisma accelerate, as prisma won't work in serverless envs.

The pooled connection we get from neon.db doesn't have a bunch of prisma dependencies which prisma pooled connection have.

```

Bindings

https://hono.dev/getting-started/cloudflare-workers#bindings

In Cloudflare workers, we can bind the environment values, KV namespace, R2 bucket etc. We can access them in "c.env". It will have the types if we pass the "type struct" for the bindings to the Hono as generics.

type Bindings = {
    BUCKET: R2Bucket,
    USERNAME: string,
    PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>();

In our case, we need 2 env variables -
JWT_SECRET
DATABASE_URL

Variables

https://hono.dev/api/context#var

If you want to get and set values on the context of the request, you can use c.get and c.set

c.set("userId",jwt_id);
await next();

You need to make typescript aware of the variables that you will be setting on the context.

Variables: {
    userId: string,
}

You can also create a middleware that sets "prisma" in the context so you don’t need to initialise it in the function body again and again.


```
