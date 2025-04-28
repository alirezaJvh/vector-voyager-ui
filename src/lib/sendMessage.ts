export async function sendMessage(message: string) {
  const response = await fetch('/api/v1/llm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: message }),
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.detail);
  }
  return data;
}
