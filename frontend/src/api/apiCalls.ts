import axios from 'axios';

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

