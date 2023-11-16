import axios from 'axios';
import { createAPI, API } from '../apis';
import { APIResponse, Comment } from '../types';

export type GetCommentsProps = {
  skip: number;
  take: number;
  recordId: string;
};

export type GetCommentsResponse = {
  comments: Comment[];
  totalCount: number;
};

export const getComments = async ({
  skip,
  take,
  recordId,
}: GetCommentsProps): Promise<APIResponse<GetCommentsResponse>> => {
  const apiUrl = createAPI(API.GET_RECORDS_COMMENTS, {
    pathParams: {
        id: recordId
    }
  });
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'get',
      params: {
        skip,
        take
      },
    })
    .then((response) => {
      return response.data;
    });
};

export type PostCommentProps = {
  recordId: string;
  message: string;
};

export const postComment = async ({
  recordId,
  message,
}: PostCommentProps) => {
  const apiUrl = createAPI(API.POST_RECORDS_COMMENTS, {
    pathParams: { id: recordId },
  });
  return await axios
    .request({
      url: `${process.env.PHOIBE_API}${apiUrl}`,
      method: 'post',
      data: {
        message,
      },
    })
    .then((response) => {
      return response.data;
    });
};