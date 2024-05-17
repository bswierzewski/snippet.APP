'use client';

import { Cloud, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { env } from 'next-runtime-env';
import Image from 'next/image';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function Avatar() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="rounded-full"
          src={session.data?.user.image ?? ''}
          width={40}
          height={40}
          alt="Picture of the author"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session.data?.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>Features</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: `https://${env('NEXT_PUBLIC_AUTH0_DOMAIN')}/v2/logout?client_id=${env('NEXT_PUBLIC_AUTH0_CLIENTID')}&returnTo=${env('NEXT_PUBLIC_NEXTAUTH_URL')}`,
              redirect: true
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
