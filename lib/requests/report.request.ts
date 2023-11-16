import axios from 'axios';
import { createAPI, API } from '../apis';
import { APIResponse, Record } from '../types';
import getConfig from 'next/config';

export type GetRecordsProps = {
  skip: number;
  take: number;
  url: string;
};

export type GetRecordsResponse = {
  records: Record[];
  totalCount: number;
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
