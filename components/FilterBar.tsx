import React from 'react';
import { CalendarIcon, ChevronDownIcon, SearchIcon } from './icons/Icons';
import { League } from '../types';

interface FilterBarProps {
  date: string;
  onDateChange: (date: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  leagues: League[];
  selectedLeagueId: number | 'all';
  onLeagueChange: (leagueId: string) => void;
  leaguesLoading: boolean;
}

const FilterBar = ({
  date,
  onDateChange,
  searchTerm,
  onSearchChange,
  leagues,
  selectedLeagueId,
  onLeagueChange,
  leaguesLoading,
}: FilterBarProps) => {
  return (
    <div className="sticky top-16 z-40 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search team..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent focus:outline-none"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent focus:outline-none appearance-none"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
           <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={selectedLeagueId}
            onChange={(e) => onLeagueChange(e.target.value)}
            disabled={leaguesLoading}
            className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="all">All Leagues</option>
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;