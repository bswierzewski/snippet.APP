import { CheckCheck, LoaderIcon } from 'lucide-react';

export default function LoadingIndicator({ isFetching }: { isFetching: boolean }) {
  return (
    <div className="flex justify-center">
      {isFetching ? (
        <>
          <LoaderIcon className="animate-spin mb-5 mr-2" /> Loading ...
        </>
      ) : (
        <>
          <CheckCheck className="mb-5 mr-2" /> Data sync
        </>
      )}
    </div>
  );
}
