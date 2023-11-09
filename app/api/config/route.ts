import { PrismaClient } from '@prisma/client';
import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCode } from '@/lib/constants/response-code';

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  try {
    const config = await prisma.config.findFirst();
    return NextResponse.json({ msg: '', data: config, code: ResponseCode.OK });
  } catch (err) {
    return NextResponse.json({
      data: null,
      msg: 'Error',
      code: ResponseCode.ERROR,
    });
  }
};
