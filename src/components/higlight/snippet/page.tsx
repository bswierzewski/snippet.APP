'use client';

import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SnippetForm, { SnippetFormSchema } from '@/components/snippets/SnippetForm';
import { CreateSnippet } from '@/hooks/mutations';

export default function SnippetCreate() {
  const router = useRouter();
  const { mutate, isPending } = CreateSnippet({
    onSuccess() {
      router.push('/');
    }
  });

  const onSubmit: SubmitHandler<SnippetFormSchema> = (data) => {
    mutate({
      body: {
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

  return <SnippetForm onSubmit={onSubmit} mode="create" isPending={isPending} />;
}
