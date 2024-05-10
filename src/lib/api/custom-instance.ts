import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }); // use your own URL here or environment variable

// Add interceptors
AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error && error.response && error.response.status >= 400) {
      if (error.response.status === 401) {
        signOut({ redirect: false });
      }

      toast.error(`${error.message}`);
    }

    return Promise.reject(error);
  }
);

// Custom instance function
export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
