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
import { Textarea } from '@/components/ui/textarea';
import { postReport } from '@/lib/requests/report.request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  websiteName: z.string().min(1, '此為必填欄位').max(200, '超過字數上限'),
  url: z.string().min(1, '此為必填欄位').max(300, '超過字數上限'),
  description: z.string().max(300),
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
      description: values.description
    });

    router.replace('/');
  }

  return (
    <div>
      <div
        className={`flex h-[300px] items-center banner_bg pt-20 transition-all`}
      >
        <div className='container text-center'>
          <h1 className='text-3xl text-white'>回報中心</h1>
        </div>
      </div>
      <div className='container'>
        <section className='mx-auto grid max-w-2xl gap-4 px-4 py-12'>
          <h2 className='text-xl text-primary'>回報風險、詐騙網址</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='websiteName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>回報網站名稱*</FormLabel>
                    <FormControl>
                      <Input placeholder='回報網站名稱' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>回報網站網址*</FormLabel>
                    <FormControl>
                      <Input type='url' placeholder='回報網站網址' {...field} />
                    </FormControl>
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
                      <Textarea placeholder='描述' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>送出</Button>
            </form>
          </Form>
        </section>
        <section className='mx-auto grid max-w-2xl gap-4 px-4 py-12'>
          <p className="text-gray-500 text-sm">回報之網站會通過人工審核，但並不保證完全正確，僅供防範參考。</p>
        </section>
      </div>
    </div>
  );
};
