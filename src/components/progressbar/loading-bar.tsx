import { cn } from '@/lib/utils';

export const LoadingBar = ({
  className,
  isLoading,
}: {
  className?: string;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading && (
        <div className={cn('progress-bar', className)}>
          <div className="progress-bar-value" />
        </div>
      )}
    </>
  );
};
