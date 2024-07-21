import axios from 'axios';
import { logger } from 'react-query/types/react/logger';

import { API_ENDPOINTS } from './apiConfig';

import { ProcessQueryResult } from 'src/models/ProcessQueryResult';
import { ProcessQueryFormat } from 'src/models/ProcessQueryFormat';

export async function ProcessQueryApiCallThrowable(prompt : string, questions: string[], answers : string[]): Promise<ProcessQueryResult> {
  const msg : ProcessQueryFormat = {
    basicPrompt: prompt,
    questions : questions,
    answers : answers,
  };

  console.log('Sending process query request with payload: ', msg);
  const response = await axios.post<ProcessQueryResult>(API_ENDPOINTS.processQuery, { msg });
  return response.data;
}

export interface ResearchStateMessage {
  type: 'url' | 'info' | 'error' | 'none';
  content: string;
}

export async function getResearchState(): Promise<ResearchStateMessage> {
  try {
    // TODO: NOT SURE IF THIS IS THE RIGHT TYPE OF COMMUNICATION
    const response = await axios.get<string>(API_ENDPOINTS.getResearchState);
    return JSON.parse(response.data);
  } catch (error) {
    logger.error('Error getting research state:', error); // Log the entire error for debugging
    return { type: 'error', content: 'Error fetching research state' };
  }
}
