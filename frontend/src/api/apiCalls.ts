import axios from 'axios';
import { log } from 'console';

import { API_ENDPOINTS } from './apiConfig';

import { ItemRecommendationBoxData } from 'src/models/ItemRecommendationBoxData';


interface ValidSearchPromptResponse {
  status: string;
}
export async function validateSearchPrompt(prompt : string) : Promise<boolean> {
  try {
    const response = await axios.post<ValidSearchPromptResponse>(API_ENDPOINTS.validateSearchResult, { prompt });
    return response.data.status === 'success';
  } catch (error) {
    console.error('Error validating search prompt:', error); // Log the entire error for debugging
    return false;
  }
}

interface RecommendationResponse {
  recommendations: ItemRecommendationBoxData[];
}

export async function getRecommendations(prompt : string) : Promise<ItemRecommendationBoxData[]> {
  try {
    const response = await axios.post<RecommendationResponse>(API_ENDPOINTS.getRecommendations, { prompt });
    return response.data.recommendations;
  } catch (error) {
    console.error('Error validating recomendation query:', error); // Log the entire error for debugging
    return [];
  }
};

interface ResearchStateMessage {
  type: string; // 'url' | 'info' | 'error';
  content: string;
}

export async function getResearchState() : Promise<ResearchStateMessage> {

