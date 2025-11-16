import React from 'react';
import { Link } from 'react-router-dom';
import { Fixture } from '../types';
import ProbabilityBar from './ProbabilityBar';
import ImageWithFallback from './ImageWithFallback';

interface FixtureCardProps {
  fixture: Fixture;
}

const TeamDisplay = ({ name, logo }: { name: string; logo: string }) => (
  <div className="flex items-center gap-3">
    <ImageWithFallback src={logo} alt={`${name} logo`} className="w-8 h-8 object-contain rounded-full" />
    <span className="font-semibold text-gray-800 dark:text-gray-100">{name}</span>
  </div>
);

const FixtureCard = ({ fixture }: FixtureCardProps) => {
  const isTopPick = fixture.btts_pct > 75 || fixture.over25_pct > 75;

  // Extract time from "Day DD Mon, HH:MM" or handle fallback like "Time TBC"
  const kickoffTime = fixture.kickoff_local.includes(',')
    ? fixture.kickoff_local.split(', ')[1]
    : fixture.kickoff_local;

  return (
    <Link to={`/fixture/${fixture.fixture_id}`} className="block group [perspective:1000px]">
      <div 
        className={`
          relative bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-md 
          transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] 
          [transform-style:preserve-3d]
          group-hover:shadow-2xl group-hover:shadow-accent/20 
          dark:group-hover:shadow-accent/30
          group-hover:[transform:translateZ(15px)_rotateY(5deg)]
          dark:border-gray-700/50
          ${isTopPick ? 'border-accent/30 border' : 'border border-transparent'}
        `}
      >
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <ImageWithFallback src={fixture.league_logo} alt={fixture.league_name} className="w-5 h-5" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{fixture.league_name}</span>
            </div>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{kickoffTime}</span>
          </div>

          <div className="space-y-3 mb-4">
            <TeamDisplay name={fixture.home_team_name} logo={fixture.home_team_logo} />
            <TeamDisplay name={fixture.away_team_name} logo={fixture.away_team_logo} />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">BTTS %</span>
              <span className="font-bold text-accent">{fixture.btts_pct}%</span>
            </div>
            <ProbabilityBar value={fixture.btts_pct} />

            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-600 dark:text-gray-300">Over 2.5 Goals %</span>
              <span className="font-bold text-accent">{fixture.over25_pct}%</span>
            </div>
            <ProbabilityBar value={fixture.over25_pct} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FixtureCard;
