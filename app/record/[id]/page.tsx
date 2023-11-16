import { BaseLayout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
          className={`flex min-h-[300px] items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pb-10 pt-28 transition-all`}
        >
          <div className='container mx-auto max-w-5xl space-y-6'>
            <div className='flex max-w-full items-center space-x-4'>
              <h2 className='whitespace-nowrap text-xl text-white'>網站名稱</h2>
              <div className='inline-block rounded-lg bg-primary-foreground px-4 py-1'>
                <h2 className='font-medium text-primary'>
                  {record.websiteName}
                </h2>
              </div>
            </div>
            <div className='flex max-w-full items-center space-x-4'>
              <h2 className='whitespace-nowrap text-xl text-white'>網站網址</h2>
              <div className='inline-block rounded-lg bg-primary-foreground px-4 py-1'>
                <h2 className='break-all font-medium text-primary'>
                  {record.url}
                </h2>
              </div>
            </div>
            <div className='flex max-w-full items-center space-x-4'>
              <h2 className='whitespace-nowrap text-xl text-white'>通報來源</h2>
              <h2 className='font-medium text-primary'>
                <Badge>{record.source.name}</Badge>
              </h2>
            </div>
          </div>
        </div>
        <section className='container mx-auto max-w-5xl py-10'>
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-primary'>網站描述</h3>
            <p>
              通報來源通報來源通報來源通報來源通報來源通報來源通報來源通報來源通報來源通報來源通報來源通報來源
            </p>
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
