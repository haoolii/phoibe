import { PaginationItem } from "./pagination.types";

export const getLastIndex = (total: number, pageSize: number): number  => {
  return Math.ceil(total / pageSize);
}

export const getListOfPageItem = (pageIndex: number, lastIndex: number): Array<Partial<PaginationItem>> => {
    const concatWithPrevNext = (listOfPage: Array<Partial<PaginationItem>>): Array<Partial<PaginationItem>> => {
      const prevItem:Partial<PaginationItem> = {
        type: 'prev',
        disabled: pageIndex === 1
      };
      const nextItem:Partial<PaginationItem> = {
        type: 'next',
        disabled: pageIndex === lastIndex
      };
      return [prevItem, ...listOfPage, nextItem];
    };
    const generatePage = (start: number, end: number): Array<Partial<PaginationItem>> => {
      const list: Array<Partial<PaginationItem>> = [];
      for (let i = start; i <= end; i++) {
        list.push({
          index: i,
          type: 'page'
        });
      }
      return list;
    };
    if (lastIndex <= 9) {
      return concatWithPrevNext(generatePage(1, lastIndex));
    } else {
      const generateRangeItem = (selected: number, last: number) => {
        let listOfRange = [];
        const prevFiveItem: Partial<PaginationItem> = {
          type: 'prev_5'
        };
        const nextFiveItem: Partial<PaginationItem> = {
          type: 'next_5'
        };
        const firstPageItem = generatePage(1, 1);
        const lastPageItem = generatePage(lastIndex, lastIndex);
        if (selected < 5) {
          // If the 4th is selected, one more page will be displayed.
          const maxLeft = selected === 4 ? 6 : 5;
          listOfRange = [...generatePage(2, maxLeft), nextFiveItem];
        } else if (selected < last - 3) {
          listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
        } else {
          // If the 4th from last is selected, one more page will be displayed.
          const minRight = selected === last - 3 ? last - 5 : last - 4;
          listOfRange = [prevFiveItem, ...generatePage(minRight, last - 1)];
        }
        return [...firstPageItem, ...listOfRange, ...lastPageItem];
      };
      return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
    }
  }