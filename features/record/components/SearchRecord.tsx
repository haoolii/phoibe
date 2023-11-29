'use client';

import { getRecords } from '@/lib/requests/report.request';
import { useCallback, useEffect, useState } from 'react';
import { Record } from '@/lib/types';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CaretRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Loading } from '@/components/loading';

type SearchRecordProps = {
  search: string;
};

export const SearchRecord = ({ search }: SearchRecordProps) => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getRecords({ url: search });
      const { records, totalCount, limit } = data;
      setRecords(records);
      setTotalCount(totalCount);
      setLimit(limit);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, [setLoading, search, setLimit]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const selectText = useCallback((text: string, targetText: string) => {
    let targetIndex = text.indexOf(targetText);
    let output = [];
    let index = targetIndex;
    let subStr = text;
    while (index !== -1) {
      output.push(subStr.slice(0, index));
      output.push(subStr.slice(index, index + targetText.length));
      subStr = subStr.slice(index + targetText.length, subStr.length);
      index = subStr.indexOf(targetText);
    }
    output.push(subStr);
    return (
      <span className='break-all'>
        {output.map((text) => {
          if (text === targetText) {
            return (
              <b key={text} className='text-primary'>
                {text}
              </b>
            );
          } else {
            return text;
          }
        })}
      </span>
    );
  }, []);
  return (
    <div className='flex w-full flex-col items-center  md:min-h-[600px]'>
      {loading ? (
        <div className='py-12'>
          <Loading />
        </div>
      ) : (
        <>
          {totalCount === 0 ? (
            <div className='space-y-4 py-10'>
              <div className='flex flex-col items-center justify-center space-y-2'>
                <MagnifyingGlassIcon className='h-14 w-14 text-gray-400' />
                <h4 className='text-center text-xl font-bold text-gray-400'>
                  未找到相關結果
                </h4>
              </div>
              <div>
                <Link href='/report'>
                  <h4 className='text-center text-xl font-bold text-primary underline-offset-4 hover:underline'>
                    點此協助回報此網址
                  </h4>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className='flex w-full flex-col space-y-4 pt-4 md:hidden'>
                {records.map((record) => {
                  return (
                    <Card className='w-full' key={record.id}>
                      <CardHeader className='p-4 pb-2'>
                        <CardTitle className='text-base font-normal'>
                          {record.websiteName}
                        </CardTitle>
                        <CardDescription>
                          {selectText(record.url, search)}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className='flex items-center justify-between p-4 pt-0'>
                        <Badge>{record.source?.name || '???'}</Badge>
                        <Link
                          href={`/record/${record.id}?${encodeURI(
                            `search=${search}`
                          )}`}
                          scroll={true}
                        >
                          <Button size='sm' variant='secondary'>
                            詳細資訊
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              <Table className='mt-2 hidden md:table'>
                <TableHeader>
                  <TableRow>
                    <TableHead>網站名稱</TableHead>
                    <TableHead>網址</TableHead>
                    <TableHead>來源</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell width={280}>{record.websiteName}</TableCell>
                      <TableCell>{selectText(record.url, search)}</TableCell>
                      <TableCell>
                        <Badge>{record.source?.name || '???'}</Badge>
                      </TableCell>
                      <TableCell className='p-0'>
                        <Link
                          href={`/record/${record.id}?${encodeURI(
                            `search=${search}`
                          )}`}
                          scroll={true}
                        >
                          <Button variant='ghost' className=''>
                            <CaretRightIcon className='text-primary' />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      )}
    </div>
  );
};
