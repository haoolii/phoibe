import Image from 'next/image';

type NoDataProps = {
  title?: string;
}

export const NoData = ({ title = 'No Data' }: NoDataProps) => {
  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
      <Image
        src={'/logo-primary.svg'}
        className='opacity-40'
        width={40}
        height={40}
        alt='Logo'
      />
      <h4 className='font-medium tracking-widest text-primary opacity-50'>
        {title}
      </h4>
    </div>
  );
};
