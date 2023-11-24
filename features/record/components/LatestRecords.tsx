'use client';

import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getLatestRecords } from '@/lib/requests/report.request';
import { Record } from '@/lib/types';
import { CaretRightIcon } from '@radix-ui/react-icons';

export const LatestRecords = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getLatestRecords();
      const { records } = data;
      setRecords(records);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, [setLoading]);
  useEffect(() => {
    loadData();
  }, []);

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
    console.log(output);
    return (
      <span>
        {output.map((text, i) => {
          if (text === targetText) {
            return <b key={`${text}_${i}`} className='text-primary'>{text}</b>;
          } else {
            return text;
          }
        })}
      </span>
    );
  }, []);

  return (
    <div className='flex w-full flex-col items-center  md:min-h-[600px]'>
      <h3 className='text-xl text-primary'>{`最新風險、詐騙網址`}</h3>
      {loading ? (
        <div className='w-full space-y-4 pt-8'>
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
        </div>
      ) : (
        <>
          <div className='flex md:hidden w-full flex-col space-y-4 pt-4'>
            {records.map((record) => {
              return (
                <Card className='w-full' key={record.id}>
                  <CardHeader className='p-4 pb-2'>
                    <CardTitle className='text-base font-normal'>
                      {record.websiteName}
                    </CardTitle>
                    <CardDescription>{record.url}</CardDescription>
                  </CardHeader>
                  <CardFooter className='flex justify-between items-center p-4 pt-0'>
                    <Badge>{record.source?.name || '???'}</Badge>
                    <Link href={`/record/${record.id}`} scroll={true}>
                      <Button size='sm' variant='secondary'>
                        詳細資訊
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <Table className="hidden md:table mt-4" >
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
                  <TableCell>{record.url}</TableCell>
                  <TableCell>
                    <Badge>{record.source?.name || '???'}</Badge>
                  </TableCell>
                  <TableCell className='p-0'>
                    <Link href={`/record/${record.id}`} scroll={true}>
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
    </div>
  );
};
