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
  const response = await fetch(`api/v1/upload`, {
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
