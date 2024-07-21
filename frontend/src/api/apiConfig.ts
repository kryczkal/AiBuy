const API_BASE_URL = 'http://0.0.0.0:8000';

export const API_ENDPOINTS = {
  processQuery: `${API_BASE_URL}/process-query`, // Processes the requests and returns the result corresponding to #11 issue on GitHub
  processResearch: `${API_BASE_URL}/do-research`,
  getResearchState: `${API_BASE_URL}/get-research-state`,
};
