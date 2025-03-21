import { getSession } from "@/app/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Call your backend API with the access token
    const response = await fetch(`${process.env.BACKEND_URL}/api/protected/data`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch protected data")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Protected data error:", error)
    return NextResponse.json({ error: "Failed to fetch protected data" }, { status: 500 })
  }
}

