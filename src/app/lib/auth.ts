import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Invalid credentials");
          }

          const data = await response.json();

          console.log("Data", data);
          if (!data.token) {
            throw new Error("Invalid user data received");
          }

          const jwtToken = data.token;

          const userResponse = await fetch(
            `${process.env.BACKEND_URL}/api/auth/user`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );
          const userData = await userResponse.json();

          const user = userData.user;
          console.log(user);

          const { id, name, email } = user ?? {};
          return {
            id: id,
            email: email,
            name: name,
          };
        } catch (error) {
          if (error instanceof Error) {
            console.error("Authentication error:", error);
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user } : {token: JWT; user?: any}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token } : {session?: any; token: JWT}) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
};