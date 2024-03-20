'use client';

import { usePathname } from 'next/navigation';
import { Url } from 'next/dist/shared/lib/router/router';
import { Btn } from './btn';

type NavLinkProps = {
  href: Url,
  className?: string,
  children: React.ReactNode,
}
export function NavLink({ href, className, children }: NavLinkProps) {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Btn
      href={href}
      className={`btn-sm font-medium bg-gray-900 hover:bg-gray-800 ${className ?? ''} ${
        active
          ? 'text-blue-500 border-gray-600 font-semibold'
          : 'text-white'
      }`}
    >
      {children}
    </Btn>
  );
}
