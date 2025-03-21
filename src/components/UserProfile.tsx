"use client";
import { useUser } from "@/app/hooks/useUser";
import { signOut, useSession } from "next-auth/react";
// import { useUser } from "@/hooks/useUser";

const UserProfile = () => {
  const { data: session } = useSession();
  const { data: user, isLoading } = useUser(session?.user?.email || "");

  if (!session) return <p>Please log in</p>;
  if (isLoading) return <p>Loading user data...</p>;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default UserProfile;
