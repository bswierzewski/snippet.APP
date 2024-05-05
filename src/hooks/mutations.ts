import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import type { paths } from '@/lib/api/snippet';
import client from '@/lib/api/index';

type MutationOptions<R, T> = UseMutationOptions<R, any, RequestBodyOption<T> & ParamsOption<T>, any>;

// paths
const ADD_SNIPPET = '/api/Snippets';
const DELETE_SNIPPET = '/api/Snippets/{id}';
const UPDATE_SNIPPET = '/api/Snippets/{id}';
const UPLOAD_IMAGE = '/api/Images';

export function CreateSnippet(options?: MutationOptions<number | undefined, paths[typeof ADD_SNIPPET]['post']>) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.POST(ADD_SNIPPET, { body });

      return data;
    },
    ...options
  });
}

export function UpdateSnippet(options?: MutationOptions<void, paths[typeof UPDATE_SNIPPET]['put']>) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      await client.PUT(UPDATE_SNIPPET, {
        params: params,
        body: body
      });
    },
    ...options
  });
}

export function DeleteSnippet(options?: MutationOptions<void, paths[typeof DELETE_SNIPPET]['delete']>) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      await client.DELETE(DELETE_SNIPPET, {
        params: params
      });
    },
    ...options
  });
}

export function UploadImage(options?: MutationOptions<any, any>) {
  return useMutation({
    mutationFn: async ({body, params}) => {      
      const { data } = await client.POST(UPLOAD_IMAGE, {
        // any required for typescript satysfying
        body: body,
        bodySerializer: (body) => {
          const formData = new FormData();
          // any required for typescript satysfying
          formData.set('file', body as any);
          return formData;
        }
      });
      return data;
    },
    ...options
  });
}