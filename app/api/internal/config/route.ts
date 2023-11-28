import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCode } from '@/lib/constants/response-code';
import db from '@/lib/db';

export const GET = async (request: NextRequest) => {
  try {
    const config = await db.config.findFirst();
    return NextResponse.json({ msg: 'Success', data: config, code: ResponseCode.OK });
  } catch (err) {
    return NextResponse.json({
      data: null,
      msg: 'Error',
      code: ResponseCode.ERROR,
    });
  }
};

export const POST = async (
    request: NextRequest
  ) => {
    try {
      const { enable, title, title_en, description, description_en, syncDataAt, checkDataAt } = await request.json();
      const config = await db.config.findFirst();
      const updateConfig = await db.config.upsert({
        where: {
            id: config?.id,
        },
        update: {
            ...config,
            enable,
            title,
            title_en,
            description,
            description_en,
            syncDataAt,
            checkDataAt,
        },
        create: {
            enable,
            title,
            title_en,
            description,
            description_en,
            syncDataAt,
            checkDataAt,
        }
        })
    return NextResponse.json({ msg: 'Success', data: { updateConfig }, code: ResponseCode.OK });
    } catch (err) {
      return NextResponse.json({
        data: null,
        msg: 'Error',
        code: ResponseCode.ERROR,
      });
    }
};
  