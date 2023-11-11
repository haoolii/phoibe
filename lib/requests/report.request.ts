import axios from 'axios';
import { createAPI, API } from '../apis';
import { Record } from '../types';
import getConfig from 'next/config';

export type APIResponse<T> = {
  code: number;
  data: T;
  msg: string;
};

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
