import React from 'react';
import { getSession } from './lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Page = async () => {
  const session = await getSession()
  return (
    <div>
      home page
      {session ? (
        <div className="space-y-4">
          <p className="text-lg">
            You are signed in as <strong>{session?.user?.name}</strong>
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;