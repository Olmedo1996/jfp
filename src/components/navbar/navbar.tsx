import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth/auth-options';
import { CustomLink } from '@/components/custom-link/custom-link';
import { SignInButton } from '@/components/navbar/sign-in-button';
import { UserDropdown } from '@/components/navbar/user-dropdown';

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <CustomLink href="/" className="font-mono text-lg font-bold">
          {'JFP'}
        </CustomLink>
        <div className="flex items-center gap-2">
          {session ? <UserDropdown session={session} /> : <SignInButton />}
          {/* <LanguageSwitcher /> */}
        </div>
      </div>
    </header>
  );
};
