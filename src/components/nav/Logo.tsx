'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  const doReset = () => {
    if (pathname !== '/') router.push('/');
  };

  return (
    <div onClick={doReset} className="cursor-pointer">
      <Image src="/blue_horizontal.png" height={120} width={120} alt="logo" priority />
    </div>
  );
}
