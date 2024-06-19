import SnippetEmptyData from './SnippetEmptyData';

import { SnippetDto } from '@/lib/api/snippet';

import SnippetCard from '@/components/snippets/SnippetCard';

export default function SnippetsGrid({ data }: { data: SnippetDto[] | undefined }) {
  return !data || data.length === 0 ? (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <div className="text-center">
        <SnippetEmptyData />
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {data.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
