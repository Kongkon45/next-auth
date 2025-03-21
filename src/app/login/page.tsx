import { redirect } from "next/navigation"
import Link from "next/link"
import AuthForm from "../components/auth-form"
import { getSession } from "../lib/auth"

export default async function LoginPage() {
  const session = await getSession()

  // Redirect to dashboard if already logged in
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <AuthForm mode="login" />

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}

