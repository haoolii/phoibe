import { CookieIcon } from '@radix-ui/react-icons';
import { Badge } from './ui/badge';
import Link from 'next/link';

export const SiteHeader = () => {
  return (
    <div className='absolute top-0 w-full'>
      <div className='container mx-auto flex justify-between py-4'>
        <div>
          <Link href={`/`}>
            <CookieIcon className='h-6 w-6 text-white ' />
          </Link>
        </div>
        <div>
          <Link href={`/report`}>
            <Badge className='bg-black bg-opacity-75 px-3 py-1 text-xs font-thin'>
              回報中心
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};
