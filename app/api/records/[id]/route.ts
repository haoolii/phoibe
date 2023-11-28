import { ResponseCode } from '@/lib/constants/response-code';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const record = await db.record.findFirst({
      include: {
        source: true,
        comments: true
      },
      where: {
        id,
        deleted: false,
        published: true
      },
    });
    if (!record) {
      return NextResponse.json({
        msg: 'Not found',
        data: null,
        code: ResponseCode.OK,
      });
    }
    return NextResponse.json({ msg: '', data: record, code: ResponseCode.OK });
  } catch (err) {
    return NextResponse.json({
      data: null,
      msg: 'Error',
      code: ResponseCode.ERROR,
    });
  }
};
