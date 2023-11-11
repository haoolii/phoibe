export const API = {
  GET_CONFIG: '/api/config',
  GET_RECORDS: '/api/records',
  GET_RECORD: '/api/records/{{id}}',
  GET_RECORDS_COMMENTS: '/api/records/{{id}}/comments',
  POST_RECORDS_COMMENTS: '/api/records/{{id}}/comments',
  POST_REPORT: '/api/report',
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
