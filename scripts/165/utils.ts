import { parse } from 'node-html-parser';

import { Record } from './types';

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
