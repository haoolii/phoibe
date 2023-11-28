import { Badge } from './ui/badge';
import Link from 'next/link';
import Image from 'next/image';

export const SiteHeader = () => {
  return (
    <div className='absolute top-0 w-full'>
      <div className='container mx-auto flex justify-between py-4'>
        <div>
          <Link href={`/`}>
            <Image src={'/logo.svg'} width={40} height={40} alt="Logo" />
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
