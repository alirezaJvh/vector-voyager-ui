export async function sendMessage(message: string) {
  const response = await fetch('api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: message }),
  });
  const data = await response.json();
  console.log('@@@@@@@@@@@@ here @@@@@@@@@@');
  console.log(data);
  if (response.status !== 200) {
    throw new Error(data.detail);
  }
  return data;
}
