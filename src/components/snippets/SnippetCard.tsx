import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { components } from '@/lib/api/snippet';
import { Button } from '../ui/button';

import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import CodeHighlighter from '../higlight/CodeHighlighter';
import { DeleteSnippet } from '@/hooks/mutations';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { GET_SNIPPETS } from '@/hooks/queries';

type Props = {
  snippet: components['schemas']['SnippetDto'];
};

export default function SnippetCard({ snippet }: Props) {
  const [isDeleted, setDeleted] = useState<boolean>();
  const queryClient = useQueryClient();
  const { mutate, isPending } = DeleteSnippet({
    onSuccess() {
      setDeleted(true);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [GET_SNIPPETS] });
    }
  });

  return (
    <Card className={isDeleted ? 'opacity-30' : ''}>
      <div className="p-2 flex gap-2 justify-end">
        {snippet.tags?.map((tag, index) => (
          <Badge key={index} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      <CardHeader className="-mt-[15px]">
        <CardTitle>{snippet.title}</CardTitle>
        <CardDescription>{snippet.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex overflow-auto hljs">{/* <CodeHighlighter code={snippet.code ?? ''} /> */}</div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Button>
            <Link href={`/snippet/${snippet.id}`}>Edit</Link>
          </Button>
          {isPending ? (
            <Button disabled variant="destructive">
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() =>
                mutate({
                  params: {
                    path: {
                      id: snippet.id ?? 0
                    }
                  }
                })
              }
            >
              Delete
            </Button>
          )}
        </div>
        <CopyToClipboard onCopy={() => toast.success('Code coppied')} text={snippet.code ?? ''}>
          <Button>Copy</Button>
        </CopyToClipboard>
      </CardFooter>
    </Card>
  );
}
