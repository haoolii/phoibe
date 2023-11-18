import axios from 'axios';

import {
  API,
  createAPI,
} from '../apis';
import {
  APIResponse,
  Record,
} from '../types';

export type GetRecordsProps = {
  skip: number;
  take: number;
  url: string;
};

export type GetRecordsResponse = {
  records: Record[];
  totalCount: number;
};

export const getLatestRecords = async (): Promise<
  APIResponse<GetRecordsResponse>
> => {
  const apiUrl = createAPI(API.GET_LATEST_RECORDS);
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'get'
    })
    .then((response) => {
      console.log(response)
      return response.data;
    });
};

export const getRecords = async ({
  skip,
  take,
  url,
}: GetRecordsProps): Promise<APIResponse<GetRecordsResponse>> => {
  const apiUrl = createAPI(API.GET_RECORDS);
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'get',
      params: {
        skip,
        take,
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
};

export const postReport = async ({ websiteName, url }: PostReportProps) => {
  const apiUrl = createAPI(API.POST_REPORT);
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'post',
      data: {
        websiteName,
        url,
      },
    })
    .then((response) => {
      return response.data;
    });
};
