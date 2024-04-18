import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        otp: {
          label: "One Time Password",
          type: "otp",
          placeholder: "Enter OTP",
        },
      },
      async authorize(credentials: any) {
        console.log(credentials);
        // const email = credentials.email;
        // const password = credentials.password;
        // const user = await prisma.user.findOne({
        //   where: {
        //     email: email,
        //     password: password,
        //   },
        // });

        // if (!user) {
        //   // If we encountered an error, nextjs wil understand and let the FE know
        //   return null;
        // }

        // return {
        //   // whatever we want to store in the token
        //   id: user.id,
        //   email: user.email,
        // };

        // Validation must be done

        return {
          id: "user1",
          email: "user1@example.com",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user }: { user: any }) => {
      // In case we want to block a certain user
      if (user.email === "random@gmail.com") {
        return false;
      }
      return true;
    },
    jwt: async ({ token, user }: { token: any; user: any }) => {
      console.log(token);
      token.userId = token.sub; // sub contains the id, now the token object will contain userId instead of sub.
      return token;
    },
    session: async ({ session, token, user }: any) => {
      console.log(session);
      if (session && session.user) {
        session.user.id = token.userId; // token.sub
      }
      return session;
    },
  },
  pages: {
    // custom sign in page
    signIn: "/signin",
  },
};
