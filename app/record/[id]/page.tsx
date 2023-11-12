import { BaseLayout } from '@/components/layout';
import { RecordComments } from '@/features/record/components/RecordComments';
import db from '@/lib/db';

export default async function RecordDetail({
  params,
}: {
  params: { id: string };
}) {
  try {
    const record = await db.record.findUnique({
      include: {
        source: true,
        comments: true
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
          className={`flex h-[300px] items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pt-20 transition-all`}
        >
          <div className='container'>
            <div>
              <h2 className='text-2xl text-white'>網站名稱</h2>
              <h2>{record.websiteName}</h2>
            </div>
            <div>
              <h2 className='text-2xl text-white'>網站網址</h2>
              <h2>{record.url}</h2>
            </div>
            <div>
              <h2 className='text-2xl text-white'>來源</h2>
              <h2>{record.source.name}</h2>
            </div>
          </div>
        </div>
        <div className="container">
          RecordDetail
          <pre>{JSON.stringify(record, null, 2)}</pre>
          <div className='mt-10'>
          <RecordComments id={record.id} />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return <div>Error</div>;
  }
}
