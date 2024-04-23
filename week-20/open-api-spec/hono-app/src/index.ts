import { OpenAPIHono } from "@hono/zod-openapi";
import { getUserRoute } from "./route";
import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Plus Ultra",
  });
});

// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;

// We have to write very strong types, so that the openapispec file that gets generated well defined.
