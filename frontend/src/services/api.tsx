import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:4000/api';

export const uploadImages = async (name: string, images: File[]): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('name', name);

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    const response: AxiosResponse<any> = await axios.post(BASE_URL + "/images", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
