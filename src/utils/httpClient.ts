const BASE_API_URL = 'https://disease.sh/v3/covid-19';

const get = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const httpClient = Object.assign(get, { get });
