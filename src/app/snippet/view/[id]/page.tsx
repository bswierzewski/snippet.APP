'use client';

import { Files } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

import { useGetSnippet } from '@/lib/api/snippet';

import CodeHighlighter from '@/components/higlight/CodeHighlighter';
import { SkeletonCard } from '@/components/skeleton/SkeletonCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';

export default function SnippetEdit({ params }: { params: { id: number } }) {
  const maxBadgeCount = 5;
  const { data } = useGetSnippet(params.id, { query: { gcTime: 0 } });

  if (!data)
    return (
      <div className="flex justify-center">
        <SkeletonCard className="h-[600px] w-full" />
      </div>
    );

  return (
    <Card>
      <div className="p-2 flex">
        <Badge variant="secondary">{data.language}</Badge>
        <div className="flex-1"></div>
        <div className="flex gap-2">
          {data.tags?.slice(0, maxBadgeCount).map((tag, index) => <Badge key={index}>{tag}</Badge>)}
          {data.tags && data.tags.length > maxBadgeCount && <Badge>+{data.tags.length - maxBadgeCount}</Badge>}
        </div>
      </div>
      <Separator className="my-1" />
      <CardHeader className="-mt-[15px]">
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="h-[300px] flex bg-background overflow-auto px-2">
            <CodeHighlighter code={data.code ?? ''} />
          </div>
          <div className="h-[300px] flex bg-background overflow-auto px-2">
            <CodeHighlighter code={data.docs ?? ''} />
          </div>
          {data.imageUrls && (
            <div className="flex justify-center">
              <Carousel className="w-full md:w-[90%]">
                <CarouselContent>
                  {data.imageUrls.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-[4/3] items-center justify-center p-6">
                            <Image
                              src={image}
                              alt="img"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ height: '100%', width: '100%' }}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {data.imageUrls.length > 1 && (
                  <>
                    <CarouselPrevious type="button" className="hidden md:flex" />
                    <CarouselNext type="button" className="hidden md:flex" />
                  </>
                )}
              </Carousel>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
