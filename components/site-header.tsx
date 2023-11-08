import { CookieIcon } from '@radix-ui/react-icons';
import { Badge } from './ui/badge';

export const SiteHeader = () => {
  return (
    <div className='absolute top-0 w-full'>
      <div className='container mx-auto py-4 flex justify-between'>
        <div>
            <CookieIcon className='text-white w-6 h-6 ' />
        </div>
        <div>
            <a href='#'>
                <Badge className="font-thin bg-black bg-opacity-75 text-xs px-3 py-1">回報中心</Badge>
            </a>
        </div>
      </div>
    </div>
  );
};
