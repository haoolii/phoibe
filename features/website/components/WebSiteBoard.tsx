"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface Record {
    "id": string;
    "websiteName": string;
    "url": string;
    "count": number;
    "sourceId": string;
    "createdAt": string,
    "updatedAt": string
};

const getData = async (words: string, take: number, skip: number) => {
    const params = new URLSearchParams({
        url: words,
        take: `${take}`,
        skip: `${skip}`
    });
    const response = await fetch('http://localhost:3000/api/records?' + params);
    const json = await response.json();
    const { records } = json;
    return records;
}

export const WebSiteBoard = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Record[]>([]);


    const clickSearch = async () => {
        try {
            setLoading(true);
            const records = await getData(search, 10, 0);
            setLoading(false);
            setList(records);
        } catch (e) {
            setLoading(false);
        }
    }


    return (
        <div className="w-full md:w-[800px] mt-20 py-10">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Anti Scam Search</h1>
            </div>
            <div className="flex gap-4">
                <Input onChange={e => setSearch(e.target.value)} />
                <Button onClick={() => clickSearch()} disabled={loading}>Search</Button>
            </div>
            <div className="py-10">
                <Table>
                    <TableCaption>風險詐騙網站</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>網站名稱</TableHead>
                            <TableHead>網址</TableHead>
                            <TableHead>件數</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {list.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.websiteName}</TableCell>
                                <TableCell>{item.url}</TableCell>
                                <TableCell>{item.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}