export type PaginationItemType = 'page' | 'prev' | 'next' | 'prev_5' | 'next_5';

export type PaginationProps = {
    pageIndex: number;
    pageSize: number;
    onPageIndexChange?: (index: number) => void;
    onPageSizeChange?: (size: number) => void;
    total: number;
}

export type PaginationItem = {
    type: PaginationItemType,
    index?: number;   
    disabled?: boolean;
}


export type PaginationActionProps = {
    currentIndex?: number;
    onClick?: () => void;
    item: Partial<PaginationItem>;
}