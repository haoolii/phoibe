'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SearchPanel = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const query = new URLSearchParams(`search=${input}`);
    router.push(encodeURI(`/record?${query}`));
    setLoading(false);
  };
  return (
    <div className='container'>
      <div className='mb-6 text-center'>
        <h1 className='text-4xl font-bold text-white'>風險、詐騙網址查詢</h1>
        <h3 className='mt-2 text-base text-white'>
          查詢網址安全資訊，確保瀏覽網頁安全
        </h3>
      </div>
      <div className='mx-auto flex max-w-3xl flex-col'>
        <form
          className='flex flex-col gap-4'
          onSubmit={(e) => {
            setLoading(true);
            e.preventDefault();
            submit();
          }}
        >
          <Input
            placeholder='請輸入欲查詢之網址'
            className='ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0'
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button
            type='submit'
            variant='secondary'
            className='w-full px-10 font-bold text-primary ring-offset-0 transition-all hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 active:bg-white'
            disabled={!input || (input.length < 3) || loading}
          >
            搜尋
          </Button>
        </form>

        <span className='mt-4 text-xs text-white'>
          注意：此搜尋所列出之風險網站並無法100%保證確實為詐騙網站，建議將搜尋結果列為瀏覽參考，多留一份心、多一份警覺。
        </span>
      </div>
    </div>
  );
};
