export async function sendMessage(message: string, kTop: number) {
  const response = await fetch('api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: message, top_k: kTop }),
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.detail);
  }
  return data;
}
