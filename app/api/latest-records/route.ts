import {
  type NextRequest,
  NextResponse,
} from 'next/server';

import { ResponseCode } from '@/lib/constants/response-code';
import db from '@/lib/db';

export const GET = async (request: NextRequest) => {
  try {
    const records = await db.record.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      include: {
        source: true,
      },
      take: 10,
      where: {
        published: true,
        deleted: false,
      },
    });
    return NextResponse.json({
      msg: '',
      data: {
        records,
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
