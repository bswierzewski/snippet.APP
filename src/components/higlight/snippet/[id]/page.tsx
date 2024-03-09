'use client';

import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SnippetForm, { SnippetFormSchema } from '@/components/snippets/SnippetForm';
import { SkeletonCard } from '@/components/skeleton/SkeletonCard';
import { GetSnippet } from '@/hooks/queries';
import { UpdateSnippet } from '@/hooks/mutations';

export default function SnippetEdit({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { data } = GetSnippet({ params: { path: { id: params.id } }, reactQuery: { gcTime: 0 } });
  const { mutate, isPending } = UpdateSnippet({
    onSuccess() {
      router.push('/');
    }
  });

  const onSubmit: SubmitHandler<SnippetFormSchema> = (data) => {
    mutate({
      params: {
        path: {
          id: params.id
        }
      },
      body: {
        id: params.id,
        code: data.code ?? '',
        language: data.language ?? '',
        title: data.title ?? '',
        description: data.description ?? '',
        docs: data.docs ?? '',
        tags: data.tags
          ?.toString()
          .split(',')
          .map((tag) => tag.trim())
      }
    });
  };

  if (!data)
    return (
      <div className="flex justify-center">
        <SkeletonCard className="h-[600px] w-full" />{' '}
      </div>
    );

  return (
    <SnippetForm
      onSubmit={onSubmit}
      defaultValues={{
        code: data.code ?? '',
        description: data.description ?? '',
        docs: data.docs ?? '',
        language: data.language ?? '',
        tags: data.tags?.join(',') ?? '',
        title: data.title ?? ''
      }}
      mode="update"
      isPending={isPending}
    />
  );
}
