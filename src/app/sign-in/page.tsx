"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      <button onClick={() => signIn("credentials", { email: "test@mail.com", password: "password" })}>
        Sign in with Email
      </button>
    </div>
  );
};

export default SignIn;
