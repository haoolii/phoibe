import Link from 'next/link';
import db from '@/lib/db';
import { RecordComments } from '@/features/record/components/RecordComments';
import { Button } from '@/components/ui/button';
import { CaretLeftIcon } from '@radix-ui/react-icons';

export default async function RecordDetail({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string };
}) {
  const search = searchParams.search;
  try {
    const record = await db.record.findUnique({
      include: {
        source: true,
      },
      where: {
        id: params.id,
      },
    });
    if (!record) {
      return <></>;
    }
    return (
      <div>
        <div
          className={`flex min-h-[300px] flex-col justify-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pb-10 pt-20 transition-all`}
        >
          <div className='container mx-auto max-w-5xl space-y-6'>
            <div className='flex flex-col space-y-2'>
              <span className='text-white opacity-75'>網站名稱</span>
              <h2 className='text-2xl font-medium text-white'>
                {record.websiteName}
              </h2>
            </div>
            <div className='flex flex-col space-y-2'>
              <span className='text-white opacity-75'>網站網址</span>
              <h2 className='text-2xl font-medium text-white'>{record.url}</h2>
            </div>
            <div className='flex flex-col space-y-2'>
              <span className='text-white opacity-75'>通報來源</span>
              <h2 className='text-2xl font-medium text-white'>
                {record.source.name}
              </h2>
            </div>
          </div>
        </div>
        <section className='container mx-auto max-w-5xl py-10'>
          <div className='mb-4 inline-block'>
            {search === undefined ? (
              <Link href='/'>
                <Button
                  variant='link'
                  className='flex space-x-2 p-0 text-primary'
                >
                  <CaretLeftIcon />
                  <span>返回</span>
                </Button>
              </Link>
            ) : (
              <Link href={{ pathname: '/record', query: { search } }}>
                <Button
                  variant='link'
                  className='flex space-x-2 p-0 text-primary'
                >
                  <CaretLeftIcon />
                  <span>返回</span>
                </Button>
              </Link>
            )}
          </div>
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-primary'>風險網站描述</h3>
            <p>{record.description}</p>
          </div>
        </section>

        <section className='container mx-auto max-w-5xl py-10'>
          <div>
            <RecordComments recordId={record.id} />
          </div>
        </section>
      </div>
    );
  } catch (err) {
    return <div>Error</div>;
  }
}
