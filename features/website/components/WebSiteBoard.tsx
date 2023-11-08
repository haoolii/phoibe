'use client';
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

const data = {
  records: [
    {
      id: '00004128-6ef6-4373-a0be-98d1597e74e7',
      websiteName: 'Drtsche',
      url: 'www.drtsche.fyi',
      count: 5,
      originId: '1343',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:16:59.345Z',
      updatedAt: '2023-11-08T15:16:59.345Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '0009db6c-c883-4df0-af2e-21876b99b935',
      websiteName: '中國香港大樂透',
      url: 'www.cnhklot.com',
      count: 1,
      originId: '17',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:17:00.500Z',
      updatedAt: '2023-11-08T15:17:00.500Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '000bc92e-7adf-4fba-bb11-4ab1edfdfaa7',
      websiteName: 'TANAKA',
      url: 'wmm.goldchb.com',
      count: 2,
      originId: '1340',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:16:59.475Z',
      updatedAt: '2023-11-08T15:16:59.475Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '000e7317-6385-4bcc-af8d-b67be7233e0f',
      websiteName: '富利豐',
      url: 'app.rrrrfgnj.com',
      count: 1,
      originId: '1317',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:17:00.055Z',
      updatedAt: '2023-11-08T15:17:00.055Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '000f6797-79c8-44ce-b63f-ea113241c5a6',
      websiteName: 'ACSFX全球交易',
      url: 'https://tc.acsfx.cc/',
      count: 2,
      originId: '274',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:17:02.289Z',
      updatedAt: '2023-11-08T15:17:02.289Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '001479e7-8b82-4f2c-8617-5e119fc0da79',
      websiteName: 'U-trade',
      url: 'https://www.u-trade.com/',
      count: 2,
      originId: '254',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:17:02.077Z',
      updatedAt: '2023-11-08T15:17:02.077Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '001bb99d-4455-42cc-a227-acf1652b7411',
      websiteName: 'KNNEX',
      url: 'www.knnexe.com',
      count: 2,
      originId: '1329',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:16:59.765Z',
      updatedAt: '2023-11-08T15:16:59.765Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '0020a3ae-9476-4b83-8589-158bc286fa3f',
      websiteName: '昂凡',
      url: 'app.udhxyq.top/udhxyq/',
      count: 1,
      originId: '1329',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:16:59.765Z',
      updatedAt: '2023-11-08T15:16:59.765Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '00220189-9e30-4fcc-88d2-20d4f9f22681',
      websiteName: 'Exness',
      url: 'www.nyse10.top',
      count: 2,
      originId: '97',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:17:01.793Z',
      updatedAt: '2023-11-08T15:17:01.793Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
    {
      id: '002d2df0-5dc6-47d1-bf75-66b8fa153d1b',
      websiteName: 'UEV User+',
      url: 'wwwi.uevuser.com',
      count: 2,
      originId: '4',
      sourceId: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
      published: true,
      deleted: false,
      createdAt: '2023-11-08T15:17:00.103Z',
      updatedAt: '2023-11-08T15:17:00.103Z',
      source: {
        id: '3ad160a5-ec0b-4387-a0ac-f375713b1f15',
        name: '165',
        description: '165',
        deleted: false,
        createdAt: '2023-11-08T15:16:57.638Z',
        updatedAt: '2023-11-08T15:16:57.638Z',
      },
    },
  ],
  totalCount: 14131,
};
export const WebSiteBoard = () => {
  return (
    <div className=''>
      <div className="bg-[url('/img/dapp_banner_bg.png')] bg-cover pb-24 pt-48">
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
            <div className='flex flex-col gap-6'>
              <Input
                placeholder='請輸入欲查詢之網址'
                className='ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                onChange={(e) => {}}
              />
              <Button
                variant='secondary'
                className='px-10 font-bold text-primary ring-offset-0 transition-all hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 active:bg-white'
                onClick={() => {}}
              >
                搜尋
              </Button>
            </div>
            <span className='mt-4 text-xs text-white'>
              注意：此搜尋所列出之風險網站並無法100%保證確實為詐騙網站，建議將搜尋結果列為瀏覽參考，多留一份心、多一份警覺。
            </span>
          </div>
        </div>
      </div>
      <section>
        <div className='container max-w-4xl py-20 flex flex-col items-center gap-10'>
          <h3 className="text-primary text-xl">風險、詐騙網址搜尋結果</h3>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>網站名稱</TableHead>
                <TableHead>網址</TableHead>
                <TableHead>來源</TableHead>
                <TableHead className='text-right'>回報數</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.websiteName}</TableCell>
                  <TableCell>{record.url}</TableCell>
                  <TableCell><Badge>{record.source.name}</Badge></TableCell>
                  <TableCell>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            <Pagination pageIndex={1} pageSize={30} total={data.totalCount}/>
        </div>
      </section>
      <section>
        <div className='container max-w-4xl py-20 flex flex-col items-center gap-10'>
        <h3 className="text-primary text-xl">最新回報</h3>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>網站名稱</TableHead>
                <TableHead>網址</TableHead>
                <TableHead>來源</TableHead>
                <TableHead className='text-right'>回報數</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.websiteName}</TableCell>
                  <TableCell>{record.url}</TableCell>
                  <TableCell><Badge>{record.source.name}</Badge></TableCell>
                  <TableCell>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};
