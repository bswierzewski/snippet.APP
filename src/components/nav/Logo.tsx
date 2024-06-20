'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import logo from '../../../public/blue_horizontal.png';

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  const doReset = () => {
    if (pathname !== '/') router.push('/');
  };

  return (
    <div onClick={doReset} className="cursor-pointer">
      <Image src={logo} height={120} width={120} alt="logo" sizes="120px" />
    </div>
  );
}
