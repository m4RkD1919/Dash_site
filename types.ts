/**
 * Represents the structured data used by the UI components after being
 * processed and mapped from the raw API response.
 */
export interface Fixture {
  fixture_id: number;
  kickoff_unix: number;
  kickoff_local: string;
  league_name: string;
  league_logo: string;
  home_team_name: string;
  home_team_logo: string;
  away_team_name: string;
  away_team_logo: string;
  btts_pct: number;
  over25_pct: number;
  home_win_pct: number;
  draw_pct: number;
  away_win_pct: number;
  model_version: string;
}

/**
 * Represents a single league as returned from the `/api/v1/leagues` endpoint.
 */
export interface League {
  id: number;
  name: string;
  logo: string;
}

/**
 * Represents the raw fixture data structure as received from the API.
 * This is then mapped to the `Fixture` type for use in the application.
 */
export interface ApiFixture {
  id: number;
  league_id: number;
  league_name: string;
  league_logo: string;
  season_id: number;
  date_utc: string;
  kickoff_unix: number | null;
  kickoff_local: string | null;
  status: string;
  round: string;
  home_team_id: number;
  home_team_name: string;
  home_logo: string;
  away_team_id: number;
  away_team_name: string;
  away_logo: string;
  model_version: string;
  btts_prob: number;
  ou25_prob: number;
  home_win_prob: number;
  draw_prob: number;
  away_win_prob: number;
}