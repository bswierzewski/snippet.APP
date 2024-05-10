'use client';

import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SnippetForm, { SnippetFormSchema } from '@/components/snippets/SnippetForm';
import { SkeletonCard } from '@/components/skeleton/SkeletonCard';
import { useGetSnippet, useUpdateSnippet } from '@/lib/api/snippet';

export default function SnippetEdit({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { data } = useGetSnippet(params.id, { query: { gcTime: 0 } });
  const { mutate, isPending } = useUpdateSnippet({
    mutation: {
      onSuccess() {
        router.push('/');
      }
    }
  });

  const onSubmit: SubmitHandler<SnippetFormSchema> = (data) => {
    mutate({
      id: params.id,
      data: {
        id: params.id,
        code: data.code ?? '',
        language: data.language ?? '',
        title: data.title ?? '',
        description: data.description ?? '',
        docs: data.docs ?? '',
        tags: data.tags?.map((x) => x.value) ?? [],
        imageUrls: data.imageUrls?.map((x) => x.value) ?? []
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
        tags: data.tags?.map((tag) => ({ value: tag })) ?? [],
        title: data.title ?? '',
        imageUrls: data.imageUrls?.map((url) => ({ value: url })) ?? []
      }}
      mode="update"
      isPending={isPending}
    />
  );
}
