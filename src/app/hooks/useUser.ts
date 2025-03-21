import { useQuery } from "@tanstack/react-query";

const fetchUser = async (email: string) => {
  const res = await fetch(`http://localhost:5000/api/auth/user?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const useUser = (email: string) => {
  return useQuery(["user", email], () => fetchUser(email), { enabled: !!email });
};
