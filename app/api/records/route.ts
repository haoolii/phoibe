import { ResponseCode } from '@/lib/constants/response-code';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import db from '@/lib/db';
import { logger } from '@/lib/log';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url || '');
    const limit = 50;
    const rSkip = +(searchParams.get('skip') || 0);
    const rTake = +(searchParams.get('take') || 10);
    const take = rTake >= 10 ? 10 : rTake;
    const skip = (rSkip + take) >= limit ? limit : rSkip;
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
        skip,
        take,
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
        totalCount: totalCount >= limit ? limit : totalCount,
        exceedLimit: totalCount >= limit
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
