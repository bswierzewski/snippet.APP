import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function SnippetEmptyData() {
  return (
    <>
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
    </>
  );
}
