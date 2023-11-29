import { ResponseCode } from '@/lib/constants/response-code';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import db from '@/lib/db';
import { logger } from '@/lib/log';

export const dynamic = 'force-dynamic'

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url || '');
    const limit = 20;
    const url = searchParams.get('url') || '';
    if (url.length < 3) {
      return NextResponse.json({
        msg: 'Search URL too short',
        data: null,
        code: ResponseCode.FAIL,
      });
    }
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
        skip: 0,
        take: limit,
        where: {
          url: {
            contains: url,
          },
          published: true,
          deleted: false,
        },
      }),
    ]);

    logger('search', searchParams.toString());

    return NextResponse.json({
      msg: '',
      data: {
        records,
        limit,
        totalCount
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
