import { useQuery } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import type { paths } from '@/lib/api/snippet';
import client from '@/lib/api/index';

type QueryOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> & {
    // add your custom options here
    reactQuery?: Partial<{
      enabled: boolean; // Note: React Query type’s inference is difficult to apply automatically, hence manual option passing here
      gcTime: number;
      // add other React Query options as needed
    }>;
  };

// paths
const GET_SNIPPETS = '/api/Snippets';
const GET_SNIPPET = '/api/Snippets/{id}';

export function GetSnippets({ params, body, reactQuery }: QueryOptions<paths[typeof GET_SNIPPETS]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [
      GET_SNIPPETS
      // add any other hook dependencies here
    ],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_SNIPPETS, {
        params,
        // body - isn’t used for GET, but needed for other request types
        signal // allows React Query to cancel request
      });
      return data;
      // Note: Error throwing handled automatically via middleware
    }
  });
}

export function GetSnippet({ params, body, reactQuery }: QueryOptions<paths[typeof GET_SNIPPET]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [
      GET_SNIPPET
      // add any other hook dependencies here
    ],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_SNIPPET, {
        params,
        // body - isn’t used for GET, but needed for other request types
        signal // allows React Query to cancel request
      });
      return data;
      // Note: Error throwing handled automatically via middleware
    }
  });
}

export { GET_SNIPPETS, GET_SNIPPET };
