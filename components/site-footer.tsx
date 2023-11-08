import {
  CookieIcon,
  TwitterLogoIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/button';

export const SiteFooter = () => (
  <div className=' bg-secondary'>
    <div className='container mx-auto flex items-center justify-between py-8'>
      <div>
        <CookieIcon className='h-8 w-8 text-primary' />
      </div>
      <div className='flex items-center'>
        <Button variant='link' className='text-primary'>
          聯繫我們
        </Button>
        <Button variant='link' className='p-2 text-primary'>
          <TwitterLogoIcon className=' text-primary' />
        </Button>
        <Button variant='link' className='p-2 text-primary'>
          <DiscordLogoIcon className=' text-primary' />
        </Button>
        <Button variant='link' className='p-2 text-primary'>
          <InstagramLogoIcon className=' text-primary' />
        </Button>
      </div>
    </div>
  </div>
);
