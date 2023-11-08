import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const skip = +(searchParams.get('skip') || 0);
  const take = +(searchParams.get('take') || 20);
  const url = searchParams.get('url') || '';
  const [totalCount, records] = await prisma.$transaction([
    prisma.record.count(),
    prisma.record.findMany({
      include: {
        source: true
      },
      skip,
      take,
      where: {
        url: {
          contains: url,
        },
      },
    }),
  ]);
  return NextResponse.json({ records, totalCount });
};
