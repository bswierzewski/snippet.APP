'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  function doReset() {
    if (pathname !== '/') router.push('/');
  }

  return (
    <div onClick={doReset} className="cursor-pointer flex items-center gap-2 text-3xl font-semibold">
      {theme == 'dark' ? (
        <Image src="/logo-dark.svg" height={120} width={120} alt={'logo'} />
      ) : (
        <Image src="/logo-light.svg" height={120} width={120} alt={'logo'} />
      )}
    </div>
  );
}
