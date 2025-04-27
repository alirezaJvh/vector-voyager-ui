type UploadFileParams = {
  file: File;
  reviewColumn: string;
  productId: string;
};

export async function uploadFile(params: UploadFileParams) {
  console.log('####### Processing upload request #####');
  console.log(params);
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('review_header', params.reviewColumn);
  formData.append('product_id_header', params.productId);

  const response = await fetch('/api/v1/upload', {
    method: 'POST',
    body: formData,
    headers: {
      accept: 'application/json',
    },
  });
  //   console.log("####### Upload response #####");
  //   console.log(response.status);
  const data = await response.json();
  //   console.log("####### Upload response #####");
  //   console.log(data);
  if (response.status !== 200) {
    // Promise.reject(data.detail);
    throw new Error(data.detail);
  }
  return data;
}
