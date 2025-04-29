import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('@@@@@ here @@@@');
    const body = await request.json();
    console.log(body);

    // Extract data from request
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // TODO: Add your LLM integration here
    // Example response - replace with actual LLM call
    // const response = {
    //   text: `Response to: ${prompt}`,
    //   model: options?.model || 'default-model',
    //   timestamp: new Date().toISOString(),
    // };
    console.log('@@@@@@@@@@@@ here @@@@@@@@@@');
    console.log(process.env.API_URL);
    const response = await fetch(`${process.env.API_URL}/llm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    console.log('@@@@@@@@@@@@ server response @@@@@@@@@@');
    console.log(data);
    return NextResponse.json(data);
    // return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing LLM request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
