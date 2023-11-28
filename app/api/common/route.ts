import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCode } from '@/lib/constants/response-code';
import db from '@/lib/db';

/*
{
  searchCounts: 0,
  initiativeReportCounts: 0,
  recordCounts: 0
}
*/
export const GET = async (request: NextRequest) => {
  try {
    const config = await db.config.findFirst();
    const recordCounts = await db.record.count({
      where: {
        deleted: false,
        published: true
      },
    });
    const initiativeReportCounts = await db.record.count({
      where: {
        AND: [
          {
            reportIP: {
              not: undefined
            }
          },
          {
            reportIP: {
              not: null
            }
          },
          {
            reportIP: {
              not: ''
            }
          },
        ],
        deleted: false,
        published: true
      }
    });
    const searchCounts = await db.log.count({
      where: {
        type: 'search'
      }
    })
    return NextResponse.json({ msg: 'Success', data: {
      searchCounts,
      initiativeReportCounts,
      recordCounts
    }, code: ResponseCode.OK });
  } catch (err) {
    return NextResponse.json({
      data: null,
      msg: 'Error',
      code: ResponseCode.ERROR,
    });
  }
};
