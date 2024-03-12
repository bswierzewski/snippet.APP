'use client';

import { Loader, SearchCheck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSnippetStore } from '@/stores/snippet';
import { GetSnippets } from '@/hooks/queries';

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchTerm = useSnippetStore((state) => state.searchTerm);
  const setSearchTerm = useSnippetStore((state) => state.setSearchTerm);

  const { isFetching, refetch } = GetSnippets({
    params: { query: { searchTerm: searchTerm } },
    reactQuery: { enabled: false }
  });

  function search() {
    if (pathname !== '/') router.push('/');
    refetch();
  }

  return (
    <div className={`w-[50%] items-center border-2 rounded-full py-2 shadow-sm hidden md:flex`}>
      <input
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') search();
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search by title or tags"
        className="
          flex-grow
          pl-5
          bg-transparent
          focus:outline-none
          border-transparent
          focus:border-transparent
          focus:ring-0
          text-sm
      "
      />{' '}
      {isFetching ? (
        <button disabled className="cursor-none">
          <Loader size={34} className="rounded-full p-2 cursor-pointer mx-2 animate-spin" />
        </button>
      ) : (
        <button onClick={search}>
          <SearchCheck size={34} className="rounded-full p-2 cursor-pointer mx-2" />
        </button>
      )}
    </div>
  );
}
