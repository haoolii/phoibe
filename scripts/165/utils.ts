import { parse } from 'node-html-parser';
import { Record } from './types';
import db from '@/lib/db';

export const get165Data = async () => {
  try {
      const API = 'https://165.npa.gov.tw/api/article/subclass/3';
      const response = await fetch(API);
      const json = await response.json();
      return JSON.parse(JSON.stringify(json))
  } catch (e) {
      return [];
  }
}

export const get165Source = async () => {
  let source = await db.source.findFirst({
    where: {
      name: '165',
    },
  });
  if (!source) {
    source = await db.source.create({
      data: {
        name: '165',
        description: '165',
      },
    });
  }
  return source;
}

export const handleData = (data: any[]) => {
  const output = [];
  for (let i = 0; i < data.length; i++) {
    const target = data[i];
    const websites = parseContent(target.content);
    const pure_websites = websites.filter(
      (website) => website.websiteName !== '網站名稱'
    );
    for(let j = 0; j < pure_websites.length; j++) {
      output.push({...pure_websites[j], originId: target.id});
    }
  }
  return output;
}

export const saveMany = async (data: any[], sourceId: string) => {
try {
    const syncLog = await db.syncLog.create({
      data: {
        sourceId
      }
    });
    await db.record.createMany({
      data: data.map(d => ({
        websiteName: d.websiteName || '',
        url: d.url || '',
        count: d.count || 0,
        originId: `${d.originId}` || '',
        sourceId: sourceId,
        published: true,
        deleted: false,
        syncLogId: syncLog.id,
      })),
      skipDuplicates: true
    });
    console.log('Success');
  } catch (e) {
    console.log('Error', e);

  }
}

export const parseContent = (content: string): Record[] => {
  const root = parse(content);
  const tables = root.querySelectorAll("table");
  const table = tables[0];
  const trs = table.querySelectorAll("tr");
  const result: Record[] = [];
  for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const tds = tr.querySelectorAll("td");
    result.push({
      websiteName: tds[0].textContent,
      url: tds[1].textContent,
      count: +tds[2].textContent,
    } as any);
  }
  return result;
};
