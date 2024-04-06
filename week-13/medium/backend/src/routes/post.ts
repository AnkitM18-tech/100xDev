import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@ankitm16/medium-common";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

postRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if (!response) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", response.id);
  await next();
});

//TODO : add pagination
// putting it before the :id route so that the control reached /bulk first otherwise it will fetch the /:id post.
postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      posts,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching the posts",
    });
  }
});

postRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const userId = c.get("userId");
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
        // authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!post) {
      c.status(411);
      return c.json({
        message: "Error while fetching the post",
      });
    }
    return c.json({
      post,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching the post",
    });
  }
});

postRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Incorrect inputs",
    });
  }

  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Incorrect inputs",
    });
  }

  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while updating the post",
    });
  }
});
