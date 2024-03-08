'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  mode: 'create' | 'update';
  onSubmit: SubmitHandler<SnippetFormSchema>;
  defaultValues?: SnippetFormSchema;
  isPending: boolean;
};

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  language: z.string().min(1),
  code: z.string().min(1),
  docs: z.string(),
  tags: z.string()
});

export type SnippetFormSchema = z.infer<typeof schema>;

export default function SnippetForm({ mode, onSubmit, defaultValues, isPending }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SnippetFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Snippets details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="grow">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                type="text"
                placeholder="Recursively copy all files"
                {...register('title')}
                className={`${errors.title ? 'placeholder-red-300 border border-red-400' : ''}`}
              />
            </div>
            <div className="grow">
              <Label htmlFor="shortDescription">Short description</Label>
              <Input
                id="shortDescription"
                type="text"
                placeholder="Bash script to copy all files from scr to dest"
                {...register('description')}
                className={`${errors.description ? 'placeholder-red-300 border border-red-400' : ''}`}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="grow">
              <Label htmlFor="language">Language*</Label>
              <Input
                id="language"
                type="text"
                placeholder="c#"
                {...register('language')}
                className={`${errors.language ? 'placeholder-red-300 border border-red-400' : ''}`}
              />
            </div>
            <div className="grow">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                type="text"
                placeholder="automation, files, loop"
                {...register('tags')}
                className={`${errors.tags ? 'placeholder-red-300 border border-red-400' : ''}`}
              />
            </div>
          </div>

          <Label htmlFor="code">Snippet code*</Label>
          <Textarea
            id="code"
            rows={10}
            placeholder="cp -r ./src ./dest"
            {...register('code')}
            className={`${errors.code ? 'placeholder-red-300 border border-red-400' : ''}`}
          />
          <br />

          <Label htmlFor="docs">Snippet documentation</Label>
          <Textarea
            id="docs"
            rows={10}
            placeholder="`-r` flags stand for `--recursive`"
            {...register('docs')}
            className={`${errors.docs ? 'placeholder-red-300 border border-red-400' : ''}`}
          />
        </CardContent>
        <CardFooter>
          {isPending ? (
            <Button disabled className="w-[100%]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-[100%]">{mode === 'create' ? 'Add' : 'Update'}</Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
