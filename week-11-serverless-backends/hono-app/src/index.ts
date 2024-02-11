import { Hono, Next } from "hono";
import { Context } from "hono/jsx";

const app = new Hono();

async function authMiddleware(c: any, next: any) {
  // context of this request, request, response
  if (c.req.header("Authorization")) {
    const initTime = new Date();
    // Do validation
    await next();
    const totalTime = (new Date().getTime() - initTime.getTime()) / 1000;
    console.log(`It took ${totalTime} seconds`);
  } else {
    return c.text("You dont have access");
  }
}
// app.use(authMiddleware);

app.use(async (c, next) => {
  if (c.req.header("Authorization")) {
    // Do validation
    await next();
  } else {
    return c.text("You dont have access");
  }
});

app.get("/", async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

// fetch -> json
// c => context ->
app.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

export default app;

// hono framework let us access body, headers, query params and middleware, db connections for cloudflare workers ->

// void is not a strict type -> so it won't throw error for type widening , also we can widen the type => () => void = () => {}
