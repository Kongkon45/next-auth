import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import getCurrentUser from './lib/session';

const Page = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      home page
      {user ? (
        <div className="space-y-4">
          <p className="text-lg">
            You are signed in as <strong>{user?.name}</strong>
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