import { useEffect, useState } from 'react';
import {
  PaginationProps,
  PaginationItem,
  PaginationActionProps,
  PaginationItemType,
} from './pagination.types';
import { getLastIndex, getListOfPageItem } from './pagination.utils';
import { Button } from '../ui/button';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  BorderDottedIcon,
} from '@radix-ui/react-icons';

export const PaginationAction = ({
  item,
  currentIndex,
  onClick,
  disabled = false,
}: PaginationActionProps) => {
  const baseClassName = 'w-10 h-10 p-0.5 rounded-lg transition-all';
  if ((item.type === 'next' || item.type === 'prev') && item.disabled)
    return <div className={baseClassName}></div>;
  if (item.type === 'next') {
    return (
      <Button
        onClick={onClick}
        className={baseClassName}
        disabled={item.disabled || disabled}
        variant={'secondary'}
      >
        <ChevronRightIcon />
      </Button>
    );
  }
  if (item.type === 'prev') {
    return (
      <Button
        onClick={onClick}
        className={`${baseClassName}`}
        disabled={item.disabled || disabled}
        variant={'secondary'}
      >
        <ChevronLeftIcon />
      </Button>
    );
  }
  if (item.type === 'page') {
    return (
      <Button
        onClick={onClick}
        className={`${baseClassName} hover:opacity-75`}
        variant={currentIndex === item.index ? 'default' : 'secondary'}
        disabled={disabled}
      >
        {item.index}
      </Button>
    );
  }
  if (item.type === 'next_5') {
    return (
      <Button
        onClick={onClick}
        className={baseClassName}
        variant={'ghost'}
        disabled={disabled}
      >
        <BorderDottedIcon />
      </Button>
    );
  }
  if (item.type === 'prev_5') {
    return (
      <Button
        onClick={onClick}
        className={baseClassName}
        variant={'ghost'}
        disabled={disabled}
      >
        <BorderDottedIcon />
      </Button>
    );
  }

  return <></>
};

export const Pagination = ({
  pageIndex = 1,
  pageSize = 10,
  total = 0,
  onPageIndexChange = (index: number) => {},
  onPageSizeChange = (size: number) => {},
  disabled = false,
}: PaginationProps) => {
  const [listOfPageItem, setListOfPageItem] = useState<
    Array<Partial<PaginationItem>>
  >([]);

  useEffect(() => {
    const lastIndex = getLastIndex(total, pageSize);
    const list = getListOfPageItem(pageIndex, lastIndex);
    setListOfPageItem(list);
  }, [pageIndex, pageSize, total]);

  const getDiffIndex = (pageIndex: number, item: Partial<PaginationItem>) => {
    const diff: { [key in PaginationItemType]: number } = {
      next: pageIndex + 1,
      prev: pageIndex - 1,
      page: item.index || 0,
      next_5: pageIndex + 5,
      prev_5: pageIndex - 5,
    };
    return item.type ? diff[item.type] : 0;
  };
  if (total <= 0) {
    return <></>;
  }
  return (
    <div className='flex gap-1'>
      {listOfPageItem.map((item, index) => (
        <div key={`${item.index}${item.type}${index}`}>
          <PaginationAction
            disabled={disabled}
            onClick={() => {
              console.log('Change', getDiffIndex(pageIndex, item))
              item.type && onPageIndexChange(getDiffIndex(pageIndex, item));
            }}
            currentIndex={pageIndex}
            item={item}
          ></PaginationAction>
        </div>
      ))}
    </div>
  );
};
