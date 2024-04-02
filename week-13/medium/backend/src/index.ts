import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/post";

// in TS in Hono we need to provide generic types for environment variables in Bindings:{} and Variables:{} , else it will throw an error.
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", postRouter);

export default app;
