"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div>
      <Link href={href} passHref>
        <span
          className={`${
            isActive ? 'text-red-600 font-semibold' : 'text-white'
          } hover:text-blue-400 transition duration-200`}
        >
          {label}
        </span>
      </Link>
    </div>
  );
};

export default NavLink;
