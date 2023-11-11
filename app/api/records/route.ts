import { ResponseCode } from '@/lib/constants/response-code';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skip = +(searchParams.get('skip') || 0);
    const take = +(searchParams.get('take') || 20);
    const url = searchParams.get('url') || '';
    const [totalCount, records] = await prisma.$transaction([
      prisma.record.count({
        where: {
          url: {
            contains: url,
          },
          published: true,
          deleted: false,
        },
      }),
      prisma.record.findMany({
        orderBy: [
          {
            createdAt: 'desc'
          }
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
    return NextResponse.json({
      msg: '',
      data: {
        records,
        totalCount,
      },
      code: ResponseCode.OK,
    });
  } catch (err) {
    return NextResponse.json({
      msg: 'Error',
      data: null,
      code: ResponseCode.ERROR,
    });
  }
};
