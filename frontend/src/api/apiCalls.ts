import axios from 'axios';
import { log } from 'console';

import { API_ENDPOINTS } from './apiConfig';


interface ValidSearchPromptResponse {
  status: string;
}
export async function validateSearchPrompt(prompt : string) : Promise<boolean> {
import { ItemRecommendationBoxData } from 'src/models/ItemRecommendationBoxData';


interface ValidSearchPromptResponse {
  status: string;
}
export async function validateSearchPrompt(prompt : string) : Promise<boolean> {
    try {
        const response = await axios.post<ValidSearchPromptResponse>(API_ENDPOINTS.validateSearchResult, {prompt});
        return response.data.status === 'success';
    } catch (error) {
        console.error('Error validating search prompt:', error); // Log the entire error for debugging
        return false
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

interface RecommendationResponse {
    recommendations: ItemRecommendationBoxData[];
}

export interface ResearchStateMessage {
  type: 'url' | 'info' | 'error' | 'none';
  content: string;
}


export async function getResearchState() : Promise<ResearchStateMessage> {
  try {
    // TODO: NOT SURE IF THIS IS THE RIGHT TYPE OF COMMUNICATION
    const response = await axios.get<string>(API_ENDPOINTS.getResearchState);
    return JSON.parse(response.data);
  } catch (error) {
    console.error('Error getting research state:', error); // Log the entire error for debugging
    return { type: 'error', content: 'Error fetching research state' };
  }
}

