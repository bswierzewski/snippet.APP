import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  className?: string;
};

export function SkeletonCard({ className = 'h-[250px] w-[350px]' }: Props) {
  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <Skeleton className={`h-full w-full rounded-xl`} />
      <div className="space-y-2">
        <Skeleton className={`h-4 w-full`} />
        <Skeleton className={`h-4 w-full`} />
      </div>
    </div>
  );
}
