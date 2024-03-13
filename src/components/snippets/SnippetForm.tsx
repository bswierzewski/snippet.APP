'use client';

import React, { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

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
  tags: z.array(
    z.object({
      value: z.string()
    })
  )
});

export type SnippetFormSchema = z.infer<typeof schema>;

export default function SnippetForm({ mode, onSubmit, defaultValues, isPending }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<SnippetFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'tags' });

  const [tagInputValue, setTagInputValue] = useState('');
  const appendTags = () => {
    if (tagInputValue.length <= 0) return;

    append(
      tagInputValue
        .split(',')
        .filter((tag) => tag.trim().length > 0)
        .map((tag) => ({ value: tag }))
    );

    setTagInputValue('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{mode == 'create' ? 'Create new snippets' : 'Update snippets details '}</CardTitle>
        </CardHeader>
        <Separator className="mb-2 bg-secondary" />
        <CardContent>
          <div className="mb-5 flex flex-col md:flex-row gap-2">
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
              <Label htmlFor="language">Language*</Label>
              <Input
                id="language"
                type="text"
                placeholder="c#"
                {...register('language')}
                className={`${errors.language ? 'placeholder-red-300 border border-red-400' : ''}`}
              />
            </div>
          </div>

          <Label htmlFor="shortDescription">Short description</Label>
          <Input
            id="shortDescription"
            type="text"
            placeholder="Bash script to copy all files from scr to dest"
            {...register('description')}
            className={`mb-5 ${errors.description ? 'placeholder-red-300 border border-red-400' : ''}`}
          />

          <Label htmlFor="tags">Tags</Label>
          <div className="flex">
            <Input
              id="tags"
              type="text"
              value={tagInputValue}
              placeholder="automation, files, loop"
              className={`rounded-e-none ${errors.tags ? 'placeholder-red-300 border border-red-400' : ''}`}
              onChange={(e) => setTagInputValue(e.target.value)}
              onBlur={() => appendTags()}
              onKeyDown={(e) => {
                if (e.key == 'Enter') appendTags();
              }}
            />
            <Button
              type="button"
              onClick={() => {
                appendTags();
              }}
              className="rounded-s-none"
              size="icon"
            >
              <Plus />
            </Button>
          </div>

          <div className="flex gap-2 my-2 mb-5">
            {fields?.map((field, index) => (
              <Badge key={index} className="text-sm" onClick={() => remove(index)}>
                {field.value}
              </Badge>
            ))}
          </div>

          <Label htmlFor="code">Snippet code*</Label>
          <Textarea
            id="code"
            rows={10}
            placeholder="cp -r ./src ./dest"
            {...register('code')}
            className={`mb-5 ${errors.code ? 'placeholder-red-300 border border-red-400' : ''}`}
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
