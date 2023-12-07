import {
  TwitterLogoIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const SiteFooter = () => (
  <div className=' bg-secondary'>
    <div className='container mx-auto flex items-center justify-between py-8'>
      <div>
        <Link href={`/`}>
          <Image src={'/logo-primary.svg'} width={32} height={32} alt='Logo' />
        </Link>
      </div>
      <div className='flex items-center'>
        <Link href='https://forms.gle/ir5cLxNM4mTGUrY4A' target='_blank'>
          <Button variant='link' className='text-primary'>
            聯繫我們
          </Button>
        </Link>
        {/* <Button variant='link' className='p-2 text-primary'>
          <TwitterLogoIcon className=' text-primary' />
        </Button>
        <Button variant='link' className='p-2 text-primary'>
          <DiscordLogoIcon className=' text-primary' />
        </Button>
        <Button variant='link' className='p-2 text-primary'>
          <InstagramLogoIcon className=' text-primary' />
        </Button> */}
      </div>
    </div>
  </div>
);
