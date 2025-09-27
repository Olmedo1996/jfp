'use client';

import { LoadingBar } from './loading-bar';

import { useTransitionContext } from '@/context/tansition-context';

export const HeaderLoadingBar = () => {
  const { isPending } = useTransitionContext();

  return <LoadingBar isLoading={isPending} />;
};
