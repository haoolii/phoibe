import { PrismaClient } from '@prisma/client';

import { Record } from './types';
import { parseContent } from './utils';

const API = 'https://165.npa.gov.tw/api/article/subclass/3';

const prisma = new PrismaClient();

const main = async () => {
  let source = await prisma.source.findFirst({
    where: {
      name: '165',
    },
  });
  if (!source) {
    source = await prisma.source.create({
      data: {
        name: '165',
        description: '165',
      },
    });
  }
  const response = await fetch(API);
  const json = await response.json();
  const _data = JSON.parse(JSON.stringify(json));
  const data = _data.slice(0, 5);
  console.log('data', data);
  for (let i = 0; i < data.length; i++) {
    const target = data[i];
    const websites = parseContent(target.content);
    const pure_websites = websites.filter(
      (website) => website.websiteName !== '網站名稱'
    );
    await add(prisma, `${target.id}`, `${source.id}`, pure_websites);
    console.log('Count: ', pure_websites);
  }
};

main();

const add = async (
  prisma: PrismaClient,
  originId: string,
  sourceId: string,
  records: Record[]
) => {
  try {
    const rs = records.map((record) => ({
      websiteName: record.websiteName || '',
      url: record.url || '',
      count: record.count || 0,
      originId: originId || '',
      sourceId: sourceId,
      published: true,
      deleted: false,
    }));
    await prisma.record.createMany({
      data: rs,
    });
  } catch (e) {
    console.error(e);
  }
};
