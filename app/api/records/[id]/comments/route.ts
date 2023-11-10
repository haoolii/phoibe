import { ResponseCode } from '@/lib/constants/response-code';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
  ) => {
    try {
    const recordId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const skip = +(searchParams.get('skip') || 0);
    const take = +(searchParams.get('take') || 20);
    const url = searchParams.get('url') || '';
    const [totalCount, comments] = await prisma.$transaction([
      prisma.comment.count({
        where: {
            recordId,
            published: true,
            deleted: false,
        }
      }),
      prisma.comment.findMany({
        skip,
        take,
        where: {
          recordId,
          published: true,
          deleted: false,
        },
      }),
    ]);
      return NextResponse.json({ msg: '', data: { comments, totalCount }, code: ResponseCode.OK });
    } catch (err) {
      return NextResponse.json({
        data: null,
        msg: 'Error',
        code: ResponseCode.ERROR,
      });
    }
  };

  
export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const { message } = await request.json();
    const comment = await prisma.comment.create({
      data: {
        recordId: id,
        message,
        deleted: false,
        published: true,
      },
    });
    return NextResponse.json({ msg: '', data: { comment }, code: ResponseCode.OK });
  } catch (err) {
    return NextResponse.json({
      data: null,
      msg: 'Error',
      code: ResponseCode.ERROR,
    });
  }
};
