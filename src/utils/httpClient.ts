const BASE_API_URL = 'https://disease.sh/v3/covid-19';

export interface httpResponse<T> {
  data: T;
  status: number;
  errorMessage: string | null;
}

const get = async <T>(endpoint: string): Promise<httpResponse<T>> => {
  const response = await fetch(`${BASE_API_URL}/${endpoint}`);
  const responseJson = await response.json();

  const data = responseJson as T;
  const errorMessage = response.ok
    ? null
    : `HTTP error: ${responseJson['message'] || response.status}`;

  return {
    data,
    errorMessage,
    status: response.status,
  };
};

export const httpClient = Object.assign(get, { get });
