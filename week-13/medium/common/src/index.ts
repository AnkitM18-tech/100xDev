import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

// type inference in zod, we just want the infered type at the FE even though the validation will be done in the BE. The FE developer will get to know what data is required and they don't have to open backend folder to see what type is required to be sent.

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SignUpInput = z.infer<typeof signupInput>;

export type SignInInput = z.infer<typeof signinInput>;

export type CreatePostInput = z.infer<typeof createPostInput>;

export type UpdatePostInput = z.infer<typeof updatePostInput>;
