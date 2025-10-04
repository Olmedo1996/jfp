import { useRouter } from 'next/navigation';

import { useTransitionContext } from '@/context/tansition-context';

export const useTransitionRouter = () => {
  const router = useRouter();
  const { startTransition } = useTransitionContext();

  const customRouter = {
    ...router,
    push: (url: string) => {
      startTransition(() => router.push(url));
    },
    replace: (url: string) => {
      startTransition(() => router.replace(url));
    },
    back: () => {
      startTransition(() => router.back());
    },
    prefetch: (url: string) => {
      startTransition(() => router.prefetch(url));
    },
  };

  return customRouter;
};
