import Axios from 'axios';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor';

export const API = {
  GET_COMMON: '/api/common',
  GET_RECORDS: '/api/records',
  GET_LATEST_RECORDS: '/api/latest-records',
  GET_RECORD: '/api/records/{{id}}',
  GET_RECORDS_COMMENTS: '/api/records/{{id}}/comments',
  POST_RECORDS_COMMENTS: '/api/records/{{id}}/comments',
  POST_REPORT: '/api/report/',
};

export const createAPI = (
  url: string,
  {
    pathParams = {},
  }: {
    pathParams?: { [key: string]: any };
  } = {}
) => {
  return url.replace(/\{\{(\w+)\}\}/g, (match, p1) => pathParams[p1]);
};

export const cacheAxios = setupCache(Axios.create(), {
  storage:
    typeof window !== 'undefined'
      ? buildWebStorage(localStorage, 'axios-cache:')
      : undefined,
  ttl: 1000 * 60,
});

export const defaultAxios = setupCache(Axios.create());
