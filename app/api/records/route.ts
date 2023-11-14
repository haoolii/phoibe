import { ResponseCode } from '@/lib/constants/response-code';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url || '');
    const skip = +(searchParams.get('skip') || 0);
    const take = +(searchParams.get('take') || 20);
    const url = searchParams.get('url') || '';
    const [totalCount, records] = await db.$transaction([
      db.record.count({
        where: {
          url: {
            contains: url,
          },
          published: true,
          deleted: false,
        },
      }),
      db.record.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        include: {
          source: true,
        },
        skip,
        take: take > 20 ? 20 : take,
        where: {
          url: {
            contains: url,
          },
          published: true,
          deleted: false,
        },
      }),
    ]);
    return NextResponse.json({
      msg: '',
      data: {
        records,
        totalCount,
      },
      code: ResponseCode.OK,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      msg: 'Error',
      data: JSON.stringify(err),
      code: ResponseCode.ERROR,
    });
  }
};
