// src/lib/api/index.ts
import createClient, { Middleware } from 'openapi-fetch';
import { paths } from './snippet';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

let accessToken: string | undefined = undefined;

const authMiddleware: Middleware = {
  async onRequest(req) {
    if (!accessToken) {
      const authRes = await getSession();
      if (authRes?.access_token) {
        accessToken = authRes.access_token;
      }
    }

    req.headers.append('Authorization', `Bearer ${accessToken}`);

    // This promise help to make better user interface
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return req;
  },
  async onResponse(res: Response) {
    // This promise help to make better user interface
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    if (res.status >= 400) {
      if (res.status === 401) {
        signOut({ redirect: false });
      }

      const body = res.headers.get('content-type')?.includes('json')
        ? await res.clone().json()
        : await res.clone().text();

      toast.error(`${res.status}`);

      throw new Error(body);
    }

    //This will leave the request/response unmodified, and pass things off to the next middleware handler (if any)
    return undefined;
  }
};

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL
});

client.use(authMiddleware);

export default client;
