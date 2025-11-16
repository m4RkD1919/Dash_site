import { Fixture, ApiFixture, League } from '../types';
import { API_BASE_URL } from '../config';
import { mapApiFixtureToFixture } from '../utils/mappers';

/**
 * A generic fetch handler that correctly constructs URLs and includes error handling and cancellation support.
 * @param endpoint The API endpoint path (e.g., /api/v1/fixtures).
 * @param signal An AbortSignal to allow for request cancellation.
 * @returns A promise that resolves with the parsed JSON data.
 */
const apiFetch = async <T>(endpoint: string, signal?: AbortSignal): Promise<T> => {
    // This function constructs an absolute URL to the backend API.
    // Because the frontend and backend are on different domains, this is a
    // cross-origin request. The backend server must have CORS (Cross-Origin
    // Resource Sharing) correctly configured to accept requests from the
    // frontend's domain.
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, { signal });
    
    if (!response.ok) {
        // Attempt to get more detailed error info from the response body for better debugging.
        let errorBody = 'No error details available.';
        try {
            errorBody = await response.text();
        } catch (e) {
            // Ignore if the body can't be read.
        }
        throw new Error(`API call failed with status: ${response.status}. URL: ${url}. Details: ${errorBody}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        // Read the response text to include in the error message for better debugging.
        const responseText = await response.text();
        throw new TypeError(`Expected JSON response from API, but received ${contentType || 'no content type'}. This likely means the API endpoint is incorrect or the backend is not sending the correct data. Response body: "${responseText.substring(0, 100)}"`);
    }

    return response.json() as Promise<T>;
};

/**
 * Fetches the list of all available leagues.
 * @param signal An AbortSignal for cancellation.
 * @returns A promise that resolves to an array of leagues.
 */
export const getLeagues = async (signal?: AbortSignal): Promise<League[]> => {
    return await apiFetch<League[]>(`/api/v1/leagues`, signal);
};


/**
 * Fetches fixtures for a specific day.
 * @param date The date in YYYY-MM-DD format. Defaults to today.
 * @param leagueId The ID of the league. If omitted, fetches for all leagues.
 * @param signal An AbortSignal for cancellation.
 * @returns A promise that resolves to an array of fixtures.
 */
export const getFixturesByDay = async (date?: string, leagueId?: number, signal?: AbortSignal): Promise<Fixture[]> => {
  const params = new URLSearchParams();
  if (date) {
    params.append('date', date);
  }
  // The leagueId parameter is optional. The API will return fixtures for all
  // leagues if it is omitted.
  if (leagueId) {
    params.append('league_id', String(leagueId));
  }
  
  const endpoint = `/api/v1/fixtures?${params.toString()}`;
  const data = await apiFetch<ApiFixture[]>(endpoint, signal);
  return data.map(mapApiFixtureToFixture);
};

/**
 * Fetches fixtures for a given date range.
 * @param from The start date in YYYY-MM-DD format.
 * @param to The end date in YYYY-MM-DD format.
 * @param leagueId The ID of the league. If omitted, fetches for all leagues.
 * @param signal An AbortSignal for cancellation.
 * @returns A promise that resolves to an array of fixtures.
 */
export const getFixturesByRange = async (from: string, to: string, leagueId?: number, signal?: AbortSignal): Promise<Fixture[]> => {
    const params = new URLSearchParams({
        from,
        to,
        limit: '500',
    });
    // The leagueId parameter is optional.
    if (leagueId) {
        params.append('league_id', String(leagueId));
    }
    const endpoint = `/api/v1/fixtures/range?${params.toString()}`;
    const data = await apiFetch<ApiFixture[]>(endpoint, signal);
    return data.map(mapApiFixtureToFixture);
}


/**
 * Fetches details for a single fixture by its ID.
 * @param id The ID of the fixture.
 * @param signal An AbortSignal for cancellation.
 * @returns A promise that resolves to a single fixture object, or undefined if not found.
 */
export const getFixtureById = async (id: number, signal?: AbortSignal): Promise<Fixture | undefined> => {
    try {
        const data = await apiFetch<ApiFixture>(`/api/v1/fixtures/${id}`, signal);
        return mapApiFixtureToFixture(data);
    } catch (error) {
        // Re-throw abort errors so they can be handled by the caller's useEffect cleanup.
        if (error.name === 'AbortError') {
            throw error;
        }
        // The API might return a 404, which our fetch wrapper will throw.
        // We can treat this as "not found".
        console.error(`Error fetching fixture ${id}:`, error);
        return undefined;
    }
}