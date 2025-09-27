'use client';

import {
  createContext,
  TransitionStartFunction,
  useContext,
  useMemo,
  useTransition,
} from 'react';

type TransitionContextValues = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

export const TransitionContext = createContext<TransitionContextValues>(
  {} as TransitionContextValues
);

interface Props {
  children: React.ReactNode;
}

export const TransitionProvider = ({ children }: Props) => {
  const [isPending, startTransition] = useTransition();

  const value = useMemo(
    () => ({ isPending, startTransition }),
    [isPending, startTransition]
  );
  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);
