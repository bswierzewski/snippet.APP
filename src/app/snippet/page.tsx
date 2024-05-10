'use client';

import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SnippetForm, { SnippetFormSchema } from '@/components/snippets/SnippetForm';
import { useCreateSnippet } from '@/lib/api/snippet';

export default function SnippetCreate() {
  const router = useRouter();
  const { mutate, isPending } = useCreateSnippet({
    mutation: {
      onSuccess() {
        router.push('/');
      }
    }
  });

  const onSubmit: SubmitHandler<SnippetFormSchema> = (data) => {
    mutate({
      data: {
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

  return <SnippetForm onSubmit={onSubmit} mode="create" isPending={isPending} />;
}
