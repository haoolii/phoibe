'use client';

export const Statistics = () => {
  return (
    <div className='flex w-full justify-around'>
      <div className="flex flex-col justify-center items-center space-y-2">
        <span className='text-3xl font-bold text-primary'>12,233</span>
        <span className="text-sm text-black">已蒐集資料數</span>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center space-y-2">
        <span className='text-3xl font-bold text-primary'>12,312,532</span>
        <span className="text-sm text-black">搜尋次數</span>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center space-y-2">
        <span className='text-3xl font-bold text-primary'>4,342</span>
        <span className="text-sm text-black">主動回報</span>
      </div>
    </div>
  );
};
