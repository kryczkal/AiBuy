import axios from 'axios';
import { log } from 'console';

import { API_ENDPOINTS } from './apiConfig';


interface ValidSearchPromptResponse {
  status: string;
}
export async function validateSearchPrompt(prompt : string) : Promise<boolean> {
  try {
    const response = await axios.post<ValidSearchPromptResponse>(API_ENDPOINTS.validateSearchResult, { prompt });
    return response.data.status === 'success';
  } catch (error) {
    if (error instanceof Error) {
      log(error.message);
    } else {
      log('An unknown error occurred');
    }
  }
  return false;
};
