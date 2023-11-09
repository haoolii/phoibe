import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params } : { params: { id: string }}) => {

    return NextResponse.json({ message: params.id })
}