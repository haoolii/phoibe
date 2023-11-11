import { ResponseCode } from '@/lib/constants/response-code';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const { websiteName, url } = await request.json();

    if (!websiteName || !url) {
      return NextResponse.json({
        msg: 'Fail',
        data: null,
        code: ResponseCode.FAIL,
      });
    }

    let source = await prisma.source.findFirst({
      where: {
        name: 'Report',
      },
    });
    if (!source) {
      source = await prisma.source.create({
        data: {
          name: 'Report',
          description: 'Report',
        },
      });
    }

    const record = await prisma.record.create({
      data: {
        websiteName,
        url,
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
