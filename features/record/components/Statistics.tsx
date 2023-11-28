'use client';

import { getCommon } from "@/lib/requests/common.request";
import { Common } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

export const Statistics = () => {
  const [common, setCommon] = useState<Common>();
  const loadData = useCallback(async () => {
    const { data } = await getCommon();
    setCommon(data);
  }, [])

  useEffect(() => {
    loadData();
  }, [loadData])

  return (
    <div className='flex w-full justify-around'>
      <div className="flex flex-col justify-center items-center space-y-2">
        <span className='text-3xl font-bold text-primary'>{common?.recordCounts.toLocaleString()}</span>
        <span className="text-sm text-black">已蒐集資料數</span>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center space-y-2">
        <span className='text-3xl font-bold text-primary'>{common?.searchCounts.toLocaleString()}</span>
        <span className="text-sm text-black">搜尋次數</span>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center space-y-2">
        <span className='text-3xl font-bold text-primary'>{common?.initiativeReportCounts.toLocaleString()}</span>
        <span className="text-sm text-black">主動回報</span>
      </div>
    </div>
  );
};
