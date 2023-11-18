"use client"

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<Record[]>([]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getLatestRecords();
      const { records } = data;
      setRecords(records);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (e) {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    loadData();
  }, []);
  
  return (
    <div className='flex flex-col w-full items-center md:min-h-[600px]'>
        <h3 className='text-xl text-primary'>{`最新風險、詐騙網址`}</h3>
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
    </div>
  );
};
