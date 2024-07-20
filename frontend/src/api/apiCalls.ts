import { API_ENDPOINTS } from './apiConfig';

interface ValidSearchPromptResponse {
  status: string;
}
export async function validateSearchPrompt(prompt : string) : Promise<boolean> {
  try {
    const response = await fetch(API_ENDPOINTS.validateSearchResult, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    if(!response.ok) {
      throw new Error('Failed to fetch results');
    }
    const data = await response.json() as ValidSearchPromptResponse;

    return data.status === 'success';
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
  return false;
};
