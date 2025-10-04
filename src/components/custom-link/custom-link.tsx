import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import { useTransitionContext } from '@/context/tansition-context';
import { cn } from '@/lib/utils';

type CustomLinkProps = LinkProps & {
  children: React.ReactNode;
  goBack?: boolean;
  replace?: boolean;
  className?: string;
};

export function CustomLink({
  children,
  goBack,
  replace,
  className,
  ...props
}: CustomLinkProps) {
  const router = useRouter();
  const { startTransition } = useTransitionContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    startTransition(() => {
      if (goBack) {
        router.back();
      } else {
        const url = props.href.toString();
        if (replace) {
          router.replace(url);
        } else {
          router.push(url);
        }
      }
    });
  };

  return (
    <Link
      {...props}
      onClick={handleClick}
      className={cn(className, 'relative')}
    >
      {children}
    </Link>
  );
}
