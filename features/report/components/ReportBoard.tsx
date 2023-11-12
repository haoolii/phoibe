'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { postReport } from '@/lib/requests/report.request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  websiteName: z.string().min(1).max(200),
  url: z.string().min(1).max(200),
  description: z.string().max(200),
});

export const ReportBoard = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteName: '',
      url: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await postReport({
      websiteName: values.websiteName,
      url: values.url,
    });

    console.log('response', response);

    router.replace('/');
  }

  return (
    <div>
      <div
        className={`flex h-[300px] items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pt-20 transition-all`}
      >
        <div className='container'></div>
      </div>
      {/* id          String    @id @default(uuid())
  websiteName String
  url         String
  count       Int
  originId    String
  source      Source    @relation(fields: [sourceId], references: [id])
  sourceId    String
  published   Boolean
  deleted     Boolean   @default
  (false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt()
  comments    Comment[] */}
      {/* TODO: 需要使用 shadcn 的 Form 元件 */}
      <div className='container'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='websiteName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>網站名稱</FormLabel>
                  <FormControl>
                    <Input placeholder='網站名稱' {...field} />
                  </FormControl>
                  {/* <FormDescription>網站名稱</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>網站網址</FormLabel>
                  <FormControl>
                    <Input placeholder='網站網址' {...field} />
                  </FormControl>
                  {/* <FormDescription>網站網址</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Input placeholder='描述' {...field} />
                  </FormControl>
                  {/* <FormDescription>描述</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
        {/* <div className='grid gap-4 py-10'>
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder='網站名稱' />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>

          <Input placeholder='網站網址' />
          <Input placeholder='描述(尚未加入此欄位)' />
        </div> */}
      </div>
    </div>
  );
};
