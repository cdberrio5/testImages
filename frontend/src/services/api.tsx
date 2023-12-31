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

export const loadImages = async (page: number, dateFrom: Date | null, dateEnd: Date | null): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/images`, {
      params: {
        page,
        dateFrom,
        dateEnd,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}