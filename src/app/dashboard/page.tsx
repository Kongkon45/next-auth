import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth"
import LogoutButton from "@/components/logout-button"

export default async function DashboardPage() {
  const user = await requireAuth()

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="text-muted-foreground">You are now logged in to your account.</p>
          <p className="text-muted-foreground mt-2">Email: {user.email}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Protected Data</h2>
          <p className="text-muted-foreground">This content is only visible to authenticated users.</p>
          <Button className="mt-4" variant="outline" asChild>
            <a href="/api/protected-data">Fetch Protected Data</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

