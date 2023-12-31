'use client';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getComments, postComment } from '@/lib/requests/comment.request';
import { Comment } from '@/lib/types/index';

import { Loading } from '@/components/loading';
import { NoData } from '@/components/noData';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface RecordCommentsProps {
  recordId: string;
}

export const RecordComments = ({ recordId }: RecordCommentsProps) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const load = useCallback(
    async (recordId: string) => {
      setLoading(true);
      const { data } = await getComments({
        take: pageSize,
        skip: pageIndex * pageSize,
        recordId,
      });
      setLoading(false);
      setTotalCount(data.totalCount);
      setComments(data.comments);
    },
    [pageSize, pageIndex]
  );

  useEffect(() => {
    load(recordId);
  }, [load, recordId]);

  const submit = async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      return;
    }
    // const token = await executeRecaptcha("createComment");
    const { data } = await postComment({
      recordId,
      message,
    });
    setMessage('');
    load(recordId);
  };
  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-xl font-semibold text-primary'>相關評論</h3>
        {
          comments.length === 0 && !loading && <div className='py-2'>
            <NoData title='暫無相關評論' />
          </div>
        }
        {comments.length === 0 && loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <>
            <div>
              {comments.map((comment) => {
                return (
                  <div key={comment.id} className='border-b py-4'>
                    <div className='flex flex-col space-y-1'>
                      <div className='flex items-center justify-between space-x-2'>
                        <h2 className='text-base font-bold text-primary'>
                          {comment.commentIP}
                        </h2>
                        <span className='text-sm text-gray-400'>
                          {new Date(comment.createdAt).toLocaleDateString()},{' '}
                          {new Date(comment.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-ellipsis overflow-hidden text-base">{comment.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {totalCount / pageSize > 1 ? (
              <div className='flex items-center justify-center py-2'>
                <Pagination
                  disabled={loading}
                  pageIndex={pageIndex + 1}
                  pageSize={pageSize}
                  total={totalCount}
                  onPageIndexChange={(index) => {
                    setPageIndex(index - 1);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <form
        className='flex flex-col gap-4 pb-20 pt-6'
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h3 className='text-xl font-semibold text-primary'>我要評論</h3>
        <h4 className='text-sm'>請寫下此網站評論，供其他網友防範參考，(上限 100 字)</h4>
        <Input
          disabled={loading}
          maxLength={100}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div>
          <Button disabled={!message.length || loading}>送出</Button>
        </div>
      </form>
    </div>
  );
};
