import { ResponseCode } from '@/lib/constants/response-code';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const record = await prisma.record.findFirst({
      include: {
        source: true,
      },
      where: {
        id,
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
