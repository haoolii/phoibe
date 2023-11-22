import { Button } from '@/components/ui/button';
import { SearchRecord } from '@/features/record/components/SearchRecord';
import Link from 'next/link';

export default function Record({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = decodeURI(searchParams.search);
  return (
    <div>
      <section
        className={`md:pt-22 flex items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pb-16 pt-32 transition-all`}
      >
        <div className='container mx-auto flex max-w-3xl flex-col'>
          <div className='flex flex-col items-center gap-8'>
            <h3 className='text-xl text-white'>
              {`風險、詐騙網址 "${search}" 搜尋結果`}
            </h3>
            <Link href='/' scroll={false}>
              <Button variant='outline' className='text-primary'>
                重新搜尋
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className='container flex max-w-4xl flex-col items-center gap-10 pb-16 pt-4 md:pt-12'>
        <div className='flex w-full justify-center md:min-h-[600px]'>
          <SearchRecord search={search} />
        </div>
      </section>
    </div>
  );
}
