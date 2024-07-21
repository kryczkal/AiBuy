import axios from 'axios';

import { API_ENDPOINTS } from './apiConfig';
import { ProcessResearchFormat } from '../models/ProcessResearchFormat';
import { ProcessResearchResults } from '../models/ProcessResearchResults';

import { ProcessQueryResult } from 'src/models/ProcessQueryResult';
import { ProcessQueryFormat } from 'src/models/ProcessQueryFormat';

export const ProcessQueryApiCallThrowable = async (prompt: string, questions: string[], answers: string[]): Promise<ProcessQueryResult> => {
  const msg: ProcessQueryFormat = {
    basicPrompt: prompt,
    questions: questions,
    answers: answers,
  };
  console.log('Sending request:', msg);
  const response = await axios.post<ProcessQueryResult>(API_ENDPOINTS.processQuery, msg, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;

};


export async function ProcessResearchApiCallThrowable(name: string, description: string): Promise<ProcessResearchResults> {
  const msg: ProcessResearchFormat = {
    name: name,
    description: description,
    questions: [],
    answers: [],
  };

  console.log('Sending process research request with payload: ', msg);
  const response = await axios.post<ProcessResearchResults>(API_ENDPOINTS.processResearch, msg, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}
