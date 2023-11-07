import { useEffect, useState } from "react";

interface PaginationProps {
    pageSize: number;
    pageIndex: number;
    total: number;
}
export const Pagination = ({ pageIndex, pageSize, total }: PaginationProps) => {
    const pageCount = Math.ceil(total / pageSize);
    const min = 0;
    const max = pageCount - 1;
    const current = pageIndex;
    const offset = 3;
    const [left, setLeft] = useState<string[]>([]);
    const [right, setRight] = useState<string[]>([]);

    useEffect(() => {
        console.log('current', current)
        if ((current - offset) === min) {
            const arr = new Array();
            arr.length = offset;
            setLeft(arr.map((_, i) => `${min + i}`))
        } else {
            const arr = new Array();
            arr.length = offset - 2;
            const head = [`${min}`, '...'];
            setLeft([...head, ...arr.map((_, i) => `${(arr.length - i)}`)])
        }

        if ((current + offset) === max) {
            const arr = new Array();
            arr.length = offset;
            setLeft(arr.map((_, i) => `${max - i}`))
        }
    }, [current, offset, min, max])

    return (<>pageCount: {pageCount}
        <pre>
            {JSON.stringify(left, null, 2)}

        </pre>
    </>)
}