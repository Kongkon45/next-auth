import { redirect } from "next/navigation"
import Link from "next/link"
import { getSession } from "../lib/auth"
import AuthForm from "../components/auth-form"

export default async function RegisterPage() {
  const session = await getSession()

  // Redirect to dashboard if already logged in
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <AuthForm mode="register" />

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

