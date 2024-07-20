import { API_ENDPOINTS } from './apiConfig';

export async function validateSearchResult() : Promise<boolean> {
  try {
    const response = await fetch(API_ENDPOINTS.validateSearchResult, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(!response.ok) {
      throw new Error('Failed to fetch results');
    }
    const data = await response.json();

    // TODO: Handle the fetched data
    console.log('Fetched data:', data);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
  return false;
};
