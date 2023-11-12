'use client';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/pagination';
import { getRecords } from '@/lib/requests/report.request';
import { Record } from '@/lib/types';
import { CookieIcon } from '@radix-ui/react-icons';
import { useDebounce } from '@react-hook/debounce';
import Link from 'next/link'

export const WebSiteBoard = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [typingUrl, setTypingUrl] = useState('');
  const [url, setUrl] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getRecords({
        take: pageSize,
        skip: pageIndex * pageSize,
        url,
      });
      const { records, totalCount } = data;
      setRecords(records);
      setTotalCount(totalCount);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (e) {
      setLoading(false);
    }
  }, [pageIndex, pageSize, url, setLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className=''>
      <div className={`flex ${url ? 'h-[300px]' : 'h-[500px]'} items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pt-20 transition-all`}>
        {url ? (
          <div className='container mx-auto flex max-w-3xl flex-col'>
            <div className='flex flex-col items-center gap-8'>
              <h3 className='text-xl text-white'>
                {`風險、詐騙網址 "${url}" 搜尋結果`}
              </h3>
              <div>
                <Button
                  variant='outline'
                  className='text-primary'
                  onClick={() => {
                    setUrl('');
                    setPageIndex(0);
                  }}
                >
                  重新搜尋
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='container'>
            <div className='mb-6 text-center'>
              <h1 className='text-4xl font-bold text-white'>
                風險、詐騙網址查詢
              </h1>
              <h3 className='mt-2 text-base text-white'>
                查詢網址安全資訊，確保瀏覽網頁安全
              </h3>
            </div>
            <div className='mx-auto flex max-w-3xl flex-col'>
              <form
                className='flex flex-col gap-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  setUrl(typingUrl);
                }}
              >
                <Input
                  placeholder='請輸入欲查詢之網址'
                  className='ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                  onChange={(e) => {
                    setTypingUrl(e.target.value);
                  }}
                />
                <Button
                  type='submit'
                  variant='secondary'
                  className='w-full px-10 font-bold text-primary ring-offset-0 transition-all hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 active:bg-white'
                  disabled={loading || !typingUrl}
                >
                  搜尋
                </Button>
              </form>

              <span className='mt-4 text-xs text-white'>
                注意：此搜尋所列出之風險網站並無法100%保證確實為詐騙網站，建議將搜尋結果列為瀏覽參考，多留一份心、多一份警覺。
              </span>
            </div>
          </div>
        )}
      </div>

      <section>
        <div className='container flex max-w-4xl flex-col items-center gap-10 py-16'>
          {!url && (
            <h3 className='text-xl text-primary'>{`最新風險、詐騙網址`}</h3>
          )}
          <div className='flex md:min-h-[600px] w-full justify-center'>
            {loading ? (
              <CookieIcon className='animate-infinite animate-ease-out my-20 h-20 w-20 animate-ping text-primary' />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>網站名稱</TableHead>
                      <TableHead>網址</TableHead>
                      <TableHead>來源</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell width={280}>{record.websiteName}</TableCell>
                        <TableCell>{record.url}</TableCell>
                        <TableCell>
                          <Badge>{record.source?.name || '???'}</Badge>
                        </TableCell>
                        <Table>
                          <Link href={`/record/${record.id}`} scroll={false}>
                            <Button>Detail</Button>
                          </Link>
                        </Table>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
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
      </section>
    </div>
  );
};
