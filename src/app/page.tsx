'use client';

import { useSnippetStore } from '@/stores/snippet';
import { useSession } from 'next-auth/react';

import { useGetSnippets } from '@/lib/api/snippet';

import LoadingIndicator from '../components/snippets/LoadingIndicator';
import UnauthenticatedView from '../components/snippets/UnauthenticatedView';
import SnippetLoading from '@/components/snippets/SnippetLoading';
import SnippetsGrid from '@/components/snippets/SnippetsGrid';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const { status } = useSession();
  const searchTerm = useSnippetStore((state) => state.searchTerm);

  const { data, isFetching, isLoading } = useGetSnippets(
    { searchTerm },
    { query: { enabled: status === 'authenticated' } }
  );

  return (
    <>
      {status !== 'authenticated' ? (
        <UnauthenticatedView status={status} />
      ) : isLoading ? (
        <SnippetLoading />
      ) : (
        <>
          <div className="flex flex-col justify-center mb-5">
            <LoadingIndicator isFetching={isFetching} />
            <Separator />
          </div>
          <SnippetsGrid data={data} />
        </>
      )}
    </>
  );
}
