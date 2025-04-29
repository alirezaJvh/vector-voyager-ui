import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    console.log(body);
    const response = await fetch(`${process.env.API_URL}/upload`, {
      method: 'POST',
      body,
    });
    const data = await response.json();
    console.log('@@@@ data @@@@@');
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing upload request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
