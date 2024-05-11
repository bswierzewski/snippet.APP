'use client';

import { useSnippetStore } from '@/stores/snippet';
import { CheckCheck, LoaderIcon, Plus } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

import { getGetSnippetsQueryKey, useGetSnippets } from '@/lib/api/snippet';

import SnippetCard from '@/components/snippets/SnippetCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const session = useSession();
  const searchTerm = useSnippetStore((state) => state.searchTerm);

  const { data, isFetching } = useGetSnippets(
    { searchTerm: searchTerm },
    { query: { enabled: session.status === 'authenticated' } }
  );

  if (session.status != 'authenticated')
    return (
      <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
        <div className="text-center">
          {session.status === 'unauthenticated' ? (
            <>
              <div className="text-2xl font-bold">You need to be logged in to do that</div>
              <div className="mt-2">Please click below to sign in</div>
              <div className="mt-4">
                <Button variant={'outline'} onClick={() => signIn('auth0')}>
                  Login
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">Session initalize</div>
              <div className="mt-2">Please wait ...</div>
            </>
          )}
        </div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col justify-center mb-5">
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
        <Separator />
      </div>
      {!data || data.length === 0 ? (
        <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">No snippets yet</div>
            <div className="mt-2">Go and add first snippet</div>
          </div>
          <div className="mt-4">
            <Link href="/snippet">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </>
  );
}
