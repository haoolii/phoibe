import { defaultAxios as axios } from '../apis';

import { API, createAPI } from '../apis';
import { APIResponse, Record } from '../types';

export type GetRecordsProps = {
  url: string;
};

export type GetRecordsResponse = {
  records: Record[];
  limit: number;
  totalCount: number;
};

export const getLatestRecords = async (): Promise<
  APIResponse<GetRecordsResponse>
> => {
  const apiUrl = createAPI(API.GET_LATEST_RECORDS);
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'get',
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

export const getRecords = async ({
  url,
}: GetRecordsProps): Promise<APIResponse<GetRecordsResponse>> => {
  const apiUrl = createAPI(API.GET_RECORDS);
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'get',
      params: {
        url,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export type PostReportProps = {
  websiteName: string;
  url: string;
  description: string;
};

export const postReport = async ({
  websiteName,
  url,
  description,
}: PostReportProps) => {
  const apiUrl = createAPI(API.POST_REPORT);
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'post',
      data: {
        websiteName,
        url,
        description,
      },
    })
    .then((response) => {
      return response.data;
    });
};
