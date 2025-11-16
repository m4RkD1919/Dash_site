import { ApiFixture, Fixture } from '../types';

/**
 * Converts a probability value (0.0 to 1.0) to a whole number percentage (0 to 100).
 * @param prob The probability value.
 * @returns The percentage value.
 */
const toPercent = (prob: number): number => Math.round(prob * 100);

/**
 * Maps a raw fixture object from the API to a structured Fixture object
 * suitable for use in the application's UI.
 *
 * @param apiFixture The raw fixture data from the API.
 * @returns A structured `Fixture` object.
 */
export const mapApiFixtureToFixture = (apiFixture: ApiFixture): Fixture => {
  return {
    fixture_id: apiFixture.id,
    kickoff_unix: apiFixture.kickoff_unix ?? 0,
    kickoff_local: apiFixture.kickoff_local ?? 'Time TBC',
    league_name: apiFixture.league_name,
    league_logo: apiFixture.league_logo,
    home_team_name: apiFixture.home_team_name,
    home_team_logo: apiFixture.home_logo,
    away_team_name: apiFixture.away_team_name,
    away_team_logo: apiFixture.away_logo,
    model_version: apiFixture.model_version,
    btts_pct: toPercent(apiFixture.btts_prob),
    over25_pct: toPercent(apiFixture.ou25_prob),
    home_win_pct: toPercent(apiFixture.home_win_prob),
    draw_pct: toPercent(apiFixture.draw_prob),
    away_win_pct: toPercent(apiFixture.away_win_prob),
  };
};
