import { BaseLayout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
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
        comments: true,
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
          className={`flex min-h-[300px] items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pt-28 pb-10 transition-all`}
        >
          <div className='container space-y-6 mx-auto max-w-5xl'>
            <div className='flex items-center space-x-4 max-w-full'>
              <h2 className='text-xl text-white whitespace-nowrap'>網站名稱</h2>
              <div className='inline-block rounded-lg bg-primary-foreground px-4 py-1'>
                <h2 className='text-primary font-medium'>{record.websiteName}</h2>
              </div>
            </div>
            <div className='flex items-center space-x-4 max-w-full'>
              <h2 className='text-xl text-white whitespace-nowrap'>網站網址</h2>
              <div className='inline-block rounded-lg bg-primary-foreground px-4 py-1'>
                <h2 className='text-primary font-medium break-all'>{record.url}</h2>
              </div>
            </div>
            <div className='flex items-center space-x-4 max-w-full'>
              <h2 className='text-xl text-white whitespace-nowrap'>通報來源</h2>
              <div className='inline-block rounded-lg bg-primary-foreground px-4 py-1'>
              <h2 className='text-primary font-medium'>{record.source.name}</h2>
              </div>
            </div>
          </div>
        </div>
        <section className='container mx-auto max-w-5xl py-10'>
          <div className="space-y-2">
            <h3 className='text-xl text-primary'>網站描述</h3>
            <Textarea readOnly rows={8} value={'123213123'} className='text-primary ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-primary resize-none' />
          </div>
          
          <div>

          </div>
          <pre>{JSON.stringify(record, null, 2)}</pre>
          <div className='mt-10'>
            <RecordComments id={record.id} />
          </div>
        </section>
      </div>
    );
  } catch (err) {
    return <div>Error</div>;
  }
}
