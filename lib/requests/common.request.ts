import { createAPI, API, cacheAxios as axios } from '../apis';
import { APIResponse, Common } from '../types';

export type GetCommonResponse = Common;

export const getCommon = async (): Promise<APIResponse<GetCommonResponse>> => {
  const apiUrl = createAPI(API.GET_COMMON);
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'get'
    })
    .then((response) => {
      return response.data;
    });
};