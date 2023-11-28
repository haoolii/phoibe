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
import { Pagination } from '@/components/pagination';

type SearchRecordProps = {
  search: string;
};

export const SearchRecord = ({ search }: SearchRecordProps) => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getRecords({
        take: pageSize,
        skip: pageIndex * pageSize,
        url: search,
      });
      const { records, totalCount } = data;
      setRecords(records);
      setTotalCount(totalCount);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, [setLoading, pageIndex, pageSize, search]);

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
      {totalCount === 0 && !loading ? (
        <div className='py-10 space-y-4'>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <MagnifyingGlassIcon className='h-14 w-14 text-gray-400' />
            <h4 className='text-center text-xl font-bold text-gray-400'>
              未找到相關結果
            </h4>
          </div>
          <div>
            <Link href="/report">
              <h4 className='text-center text-xl font-bold text-primary hover:underline underline-offset-4'>
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
          <div className='py-8'>
            <Pagination
              disabled={loading}
              pageIndex={pageIndex + 1}
              pageSize={pageSize}
              total={totalCount}
              onPageIndexChange={(index) => {
                console.log('index', index);
                setPageIndex(index - 1);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
