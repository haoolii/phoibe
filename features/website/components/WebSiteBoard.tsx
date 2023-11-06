'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Record {
  id: string;
  websiteName: string;
  url: string;
  count: number;
  sourceId: string;
  createdAt: string;
  updatedAt: string;
}

const getData = async (words: string, take: number, skip: number) => {
  const params = new URLSearchParams({
    url: words,
    take: `${take}`,
    skip: `${skip}`,
  });
  const response = await fetch('http://localhost:3000/api/records?' + params);
  const json = await response.json();
  return json;
};

const columns: ColumnDef<Record>[] = [
  {
    accessorKey: 'websiteName',
    header: '網站名稱',
  },
  {
    accessorKey: 'url',
    header: '網址',
  },
  {
    accessorKey: 'count',
    header: '件數',
  },
];

export const WebSiteBoard = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Record[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 20;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 15,
  });
  const pageCount = useMemo(() => {
    console.log('totalCount / pageSize', totalCount / pageSize);
    return totalCount / pageSize;
  }, [totalCount]);

  const table = useReactTable({
    data: list,
    columns,
    pageCount,
    state: {
      pagination,
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const clickSearch = useCallback(async () => {
    try {
      setLoading(true);
      const { records, totalCount } = await getData(
        search,
        pagination.pageSize,
        pagination.pageIndex * pagination.pageSize
      );
      setLoading(false);
      setList(records);
      setTotalCount(totalCount);
    } catch (e) {
      setLoading(false);
    }
  }, [
    setLoading,
    setTotalCount,
    pagination.pageIndex,
    pagination.pageSize,
    search,
  ]);

  useEffect(() => {
    console.log('pagination', pagination);
    clickSearch();
  }, [pagination]);

  return (
    <div className=''>
      <div className='bg-primary pb-16 pt-40'>
        <div className='container'>
          <div className='mb-4 text-center'>
            <h1 className='text-2xl font-bold text-white'>
              風險、詐騙網址查詢
            </h1>
          </div>
          <div className='mx-auto flex max-w-3xl flex-col gap-4 md:flex-row'>
            <Input
              placeholder='請輸入欲查詢之網址'
              className='ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant='secondary'
              className='px-10 font-bold text-primary ring-offset-0 transition-all hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 active:bg-white'
              onClick={() => clickSearch()}
              disabled={loading}
            >
              搜尋
            </Button>
          </div>
        </div>
      </div>
      <div className='py-10'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
      </div>
    </div>
  );
};
