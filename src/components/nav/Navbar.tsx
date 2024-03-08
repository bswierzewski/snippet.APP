'use client';

import { ThemePicker } from './ThemePicker';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';
import LoginButton from './LoginButton';
import Link from 'next/link';
import Logo from './Logo';
import Search from './Search';

export default function Navbar() {
  const session = useSession();

  return (
    <div className="flex justify-center h-20 sticky top-0 shadow-lg p-5 border-b-2">
      <div className="flex w-full max-w-screen-2xl items-center justify-between">
        <Logo />
        <Search />
        <div className="flex gap-2">
          <ThemePicker />
          {session.status == 'authenticated' ? (
            <>
              <Button variant="outline" size="icon">
                <Link href="/snippet">
                  <Plus />
                </Link>
              </Button>
              <Avatar />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
}
