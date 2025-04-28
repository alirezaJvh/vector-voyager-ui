type UploadFileParams = {
  file: File;
  reviewColumn: string;
  productId: string;
};

export async function uploadFile(params: UploadFileParams) {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('review_header', params.reviewColumn);
  formData.append('product_id_header', params.productId);
  console.log('@@@@@ here @@@');
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      accept: 'application/json',
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.detail);
  }
  return data;
}
