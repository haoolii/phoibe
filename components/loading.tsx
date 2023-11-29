import Image from 'next/image';

export const Loading = () => {
  return (
    <div className='flex animate-bounce flex-col items-center justify-center space-y-2'>
      <Image
        src={'/logo-primary.svg'}
        className='opacity-40'
        width={40}
        height={40}
        alt='Logo'
      />
      <h4 className='font-medium tracking-widest text-primary opacity-50'>
        Loading
      </h4>
    </div>
  );
};
