'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useUploadImage } from '@/lib/api/snippet';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Badge } from '../ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Separator } from '../ui/separator';

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
  ),
  imageUrls: z.array(
    z.object({
      value: z.string()
    })
  )
});

export type SnippetFormSchema = z.infer<typeof schema>;

export default function SnippetForm({ mode, onSubmit, defaultValues, isPending }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tagInputValue, setTagInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending: isUpladPending } = useUploadImage({
    mutation: {
      onSuccess(data, variables, context) {
        appendUrl({ value: data });
        resetFileInput();
      }
    }
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<SnippetFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  const { fields: tags, append: appendTag, remove: removeTag } = useFieldArray({ control, name: 'tags' });
  const { fields: images, append: appendUrl, remove: removeUrl } = useFieldArray({ control, name: 'imageUrls' });

  const appendTags = () => {
    if (tagInputValue.length <= 0) return;

    appendTag(
      tagInputValue
        .split(',')
        .filter((tag) => tag.trim().length > 0)
        .map((tag) => ({ value: tag }))
    );

    setTagInputValue('');
  };

  const uploadFile = () => {
    if (selectedFile) mutate({ data: { file: selectedFile } });
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{mode == 'create' ? 'Create new snippets' : 'Update snippets details '}</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
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
            {tags?.map((field, index) => (
              <Badge key={index} className="text-sm" onClick={() => removeTag(index)}>
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

          <Label htmlFor="picture">Picture</Label>
          <div className="flex">
            <div className="grid w-full items-center gap-1.5">
              <Input
                ref={fileInputRef}
                id="picture"
                type="file"
                className="rounded-e-none"
                onChange={(e) => (e.target.files ? setSelectedFile(e.target.files[0]) : {})}
              />
            </div>
            <Button
              type="button"
              onClick={() => uploadFile()}
              className="rounded-s-none"
              size="icon"
              disabled={isUpladPending}
            >
              <Upload className={`${isUpladPending ? 'animate-pulse' : ''}`} />
            </Button>
          </div>

          <br />

          <div className="flex justify-center">
            <Carousel className="w-full md:w-[90%]">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-[4/3] items-center justify-center p-6">
                          <Image
                            src={image.value}
                            alt="img"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ height: '100%', width: '100%' }}
                          />
                        </CardContent>
                        <div className="relative">
                          <Button
                            type="button"
                            className="absolute right-[45%] -top-[46px] bg-background rounded-full"
                            size="icon"
                            variant="ghost"
                            onClick={() => removeUrl(index)}
                          >
                            <Trash2 className="text-foreground" />
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious type="button" className="hidden md:flex" />
              <CarouselNext type="button" className="hidden md:flex" />
            </Carousel>
          </div>

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
