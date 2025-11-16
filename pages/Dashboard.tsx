import React, { useState, useEffect, useMemo } from 'react';
import { Fixture, League } from '../types';
import { getFixturesByDay, getLeagues } from '../services/api';
import FixtureCard from '../components/FixtureCard';
import FixtureCardSkeleton from '../components/FixtureCardSkeleton';
import FilterBar from '../components/FilterBar';
import { formatDateForDisplay, formatDateToYYYYMMDD } from '../utils/date';

const Dashboard = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaguesLoading, setLeaguesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Default to the current date for a live, relevant user experience.
  const [selectedDate, setSelectedDate] = useState(formatDateToYYYYMMDD(new Date()));
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const fetchLeagues = async () => {
        try {
            const data = await getLeagues(controller.signal);
            setLeagues(data);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error("Failed to fetch leagues:", err);
                // Non-critical, so we don't set a visible error
            }
        } finally {
            if (!controller.signal.aborted) {
                setLeaguesLoading(false);
            }
        }
    };
    fetchLeagues();
    return () => {
      controller.abort();
    };
  }, []);


  useEffect(() => {
    const controller = new AbortController();

    const fetchFixtures = async () => {
      try {
        setError(null);
        setLoading(true);
        const leagueParam = selectedLeagueId === 'all' ? undefined : selectedLeagueId;
        const data = await getFixturesByDay(selectedDate, leagueParam, controller.signal); 
        setFixtures(data);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Dashboard fetch aborted');
          return;
        }
        setError('Failed to fetch fixtures. The API might be temporarily down.');
        console.error(err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFixtures();

    return () => {
      controller.abort();
    };
  }, [selectedDate, selectedLeagueId]);

  const handleLeagueChange = (leagueIdStr: string) => {
    const leagueId = leagueIdStr === 'all' ? 'all' : parseInt(leagueIdStr, 10);
    setSelectedLeagueId(leagueId);
  }

  const filteredFixtures = useMemo<Fixture[]>(() => 
    fixtures.filter(f => 
      f.home_team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.away_team_name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [fixtures, searchTerm]);


  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Fixtures for {formatDateForDisplay(selectedDate)}
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Model-driven predictions for matches on the selected date.</p>
      </div>

      <FilterBar 
        date={selectedDate}
        onDateChange={setSelectedDate}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        leagues={leagues}
        selectedLeagueId={selectedLeagueId}
        onLeagueChange={handleLeagueChange}
        leaguesLoading={leaguesLoading}
      />

      {error && <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && Array.from({ length: 6 }).map((_, index) => <FixtureCardSkeleton key={index} />)}
        
        {!loading && filteredFixtures.length > 0 && filteredFixtures.map((fixture) => (
          <FixtureCard key={fixture.fixture_id} fixture={fixture} />
        ))}
        
        {!loading && !error && fixtures.length > 0 && filteredFixtures.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No fixtures match your search.</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try searching for a different team.</p>
          </div>
        )}

        {!loading && !error && fixtures.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No fixtures scheduled for this date.</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Check back tomorrow or select a different date.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;