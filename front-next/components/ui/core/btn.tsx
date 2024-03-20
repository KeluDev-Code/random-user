import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type BtnProps = {
  href?: Url,
  label?: string,
  color?: 'primary' | 'error',
  className?: string,
  children?: React.ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

export function Btn({
  children, href, label, className, onClick, color,
}: BtnProps) {
  let $className = `btn w-full mb-4 sm:w-auto sm:mb-0 ${className} transition duration-150 ease-in-out`;
  switch (color) {
    case 'primary':
      $className += ' bg-blue-800 hover:bg-blue-700 hover:border-blue-400';
      break;

    case 'error':
      $className += ' bg-red-900 hover:bg-red-800 hover:border-red-400';
      break;

    default:
      break;
  }

  return (
    href
      ? <Link href={href} className={$className} onClick={onClick}>{children || label}</Link>
      : <button type="button" className={$className} onClick={onClick}>{children}</button>
  );
}
