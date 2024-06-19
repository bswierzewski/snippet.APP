'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export default function SessionUnauthenticated() {
  return (
    <>
      <div className="text-2xl font-bold">You need to be logged in to do that</div>
      <div className="mt-2">Please click below to sign in</div>
      <div className="mt-4">
        <Button variant={'outline'} onClick={() => signIn('auth0')}>
          Login
        </Button>
      </div>
    </>
  );
}
