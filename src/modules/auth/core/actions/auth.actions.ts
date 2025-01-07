'use server';

import { cookies } from 'next/headers';
import { signOut } from 'next-auth/react';

export async function handleLogout() {
  const cookieStore = cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  await signOut({ redirect: true, callbackUrl: '/login' });
}
