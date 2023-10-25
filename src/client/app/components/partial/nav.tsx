'use client';
import React from 'react';
import { checkAuthorization, signOut } from '@/app/utils/auth';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

function PartialNav() {
  const isAuthorized = checkAuthorization();

  const params = useParams();
  const path = usePathname();
  const router = useRouter();
  const authPage = params.auth;
  const isAuthPage = !!authPage;
  if (!isAuthorized && !isAuthPage) {
    router.push('/auth/login');
  }

  const handleSignOut = () => {
    signOut();
    return router.push('/auth/login');
  };

  const handleDisable = (e) => e.preventDefault();

  return (
    !isAuthPage && (
      <nav className={'flex justify-between p-2 mb-8'}>
        <ul className={'flex flex-row gap-4 capitalize'}>
          <li>
            <Link className={path === '/schedule' ? 'underline' : ''} href="/schedule">
              schedule
            </Link>
          </li>

          <li>
            <Link className={path === '/schedule/create' ? 'underline' : ''} href="/schedule/create">
              create
            </Link>
          </li>

          <li>
            <Link
              onClick={handleDisable}
              className={`${path === '/users' ? 'underline' : ''} cursor-not-allowed`}
              href="/users"
              title={'Coming soon...'}
            >
              users
            </Link>
          </li>

          <li></li>
        </ul>

        <div className="auth flex gap-4 capitalize">
          <Link
            onClick={handleDisable}
            className={`${path === '/profile' ? 'underline' : ''} cursor-not-allowed`}
            href="/profile"
            title={'Coming soon...'}
          >
            profile
          </Link>
          {isAuthorized ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            !isAuthPage && <Link href="/auth/login">Log in</Link>
          )}
        </div>
      </nav>
    )
  );
}

export default PartialNav;
