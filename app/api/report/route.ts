import { ResponseCode } from '@/lib/constants/response-code';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const POST = async (request: NextRequest) => {
  try {
    const { websiteName, url, description } = await request.json();


    if (!websiteName || !url ||description?.length > 200) {
      return NextResponse.json({
        msg: 'Fail',
        data: null,
        code: ResponseCode.FAIL,
      });
    }

    let source = await db.source.findFirst({
      where: {
        name: 'Report',
      },
    });
    if (!source) {
      source = await db.source.create({
        data: {
          name: 'Report',
          description: 'Report',
        },
      });
    }

    const record = await db.record.create({
      data: {
        websiteName,
        url,
        description,
        originId: '',
        count: 0,
        sourceId: source.id,
        deleted: false,
        published: false,
      },
    });
    return NextResponse.json({
      msg: '',
      data: { record },
      code: ResponseCode.OK,
    });
  } catch (err) {
    return NextResponse.json({
      data: null,
      msg: 'Error',
      code: ResponseCode.ERROR,
    });
  }
};
