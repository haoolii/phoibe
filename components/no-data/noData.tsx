import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface NoDataProps {
  title?: string;
  subTitle?: string;
}

export const NoData = (props: NoDataProps) => {
  const title = props.title || 'No Data';
  const subTitle = props.subTitle || '';
  return (
    <div className='flex flex-col justify-center items-center h-48 opacity-75'>
      <div className='p-4'>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='h-20 w-20 fill-primary'
        >
            <path
            fillRule='evenodd'
            d='M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 01-.522 1.756.75.75 0 00.584 1.143 5.976 5.976 0 003.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7zm0 8a1 1 0 100-2 1 1 0 000 2zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z'
            clipRule='evenodd'
            />
        </svg>
      </div>

      <h2 className="text-lg font-medium">{title}</h2>
      <span>{subTitle}</span>
    </div>
  );
};
