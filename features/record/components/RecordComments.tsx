'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postRecordComment } from '@/lib/requests/report.request';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface RecordCommentsProps {
  id: string;
}

export const RecordComments = ({ id }: RecordCommentsProps) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const submit = async () => {
    const { data } = await postRecordComment({
      id,
      message
    });
    console.log(data)
    router.refresh();
    // router.replace('/');
  }
  return (
    <div className='flex flex-col gap-4'>
      <Input onChange={e => setMessage(e.target.value)} value={message} />
      <Button onClick={e => {
        submit()
      }}>Submit</Button>
    </div>
  );
};
