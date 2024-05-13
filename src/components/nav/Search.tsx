'use client';

import { useSnippetStore } from '@/stores/snippet';
import { Loader, SearchCheck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { useGetSnippets } from '@/lib/api/snippet';

export default function Search() {
  // State
  const [value, setValue] = useState('');

  // Hooks
  const router = useRouter();
  const pathname = usePathname();

  // Store
  // Store
  const { searchTerm, setSearchTerm } = useSnippetStore((state) => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm
  }));

  // Queries
  const { isFetching, refetch } = useGetSnippets({ searchTerm }, { query: { enabled: false } });

  // Functions
  function search() {
    if (pathname !== '/') router.push('/');
    setSearchTerm(value);
    refetch();
  }

  function handleInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className={`w-[50%] items-center rounded-full py-2 border-2 hidden md:flex dark:border-accent`}>
      <input
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') search();
        }}
        onChange={handleInputOnChange}
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
        <button onClick={() => search()}>
          <SearchCheck size={34} className="rounded-full p-2 cursor-pointer mx-2" />
        </button>
      )}
    </div>
  );
}
