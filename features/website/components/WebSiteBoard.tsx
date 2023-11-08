'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

export const WebSiteBoard = () => {
  return (
    <div className=''>
      <div className="bg-[url('/img/dapp_banner_bg.png')] bg-cover pt-48 pb-24">
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
            <span className='text-xs text-white mt-4'>
              注意：此搜尋所列出之風險網站並無法100%保證確實為詐騙網站，建議將搜尋結果列為瀏覽參考，多留一份心、多一份警覺。
            </span>
          </div>
        </div>
      </div>
      <div className='container py-10'>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {/* <Pagination
          total={total}
          pageIndex={index + 1}
          pageSize={size}
          onPageIndexChange={(index) => setIndex(index - 1)}
        /> */}
      </div>
    </div>
  );
};
