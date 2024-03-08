import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';

export default function LoginButton() {
  return (
    <Button variant="outline" onClick={() => signIn('auth0')}>
      <LogIn className="mr-2" />
      Login
    </Button>
  );
}
