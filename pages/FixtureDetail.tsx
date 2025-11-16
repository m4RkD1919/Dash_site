import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Fixture } from '../types';
import { getFixtureById } from '../services/api';
import ProbabilityBar from '../components/ProbabilityBar';
import ImageWithFallback from '../components/ImageWithFallback';

const OutcomePrediction = ({ label, value }: { label: string, value: number}) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{label}</span>
        <p className="text-3xl font-bold text-accent my-1">{value}%</p>
        <ProbabilityBar value={value} />
    </div>
);


const FixtureDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [fixture, setFixture] = useState<Fixture | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetchFixture = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getFixtureById(parseInt(id, 10), controller.signal);
                if (data) {
                    setFixture(data);
                } else {
                    setError('Fixture not found.');
                }
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('FixtureDetail fetch aborted');
                    return;
                }
                setError('Failed to fetch fixture details.');
                console.error(err);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        fetchFixture();

        return () => {
            controller.abort();
        };
    }, [id]);

    if (loading) {
        return <div className="text-center p-8">Loading fixture details...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    if (!fixture) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div className="flex items-center gap-3">
                        <ImageWithFallback src={fixture.league_logo} alt={fixture.league_name} className="w-10 h-10"/>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{fixture.league_name}</h1>
                            <p className="text-gray-500 dark:text-gray-400">{fixture.kickoff_local}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-around text-center my-8 space-y-4 md:space-y-0">
                    <div className="flex flex-col items-center">
                        <ImageWithFallback src={fixture.home_team_logo} alt={fixture.home_team_name} className="w-20 h-20 mb-2 object-contain"/>
                        <h2 className="text-xl font-semibold">{fixture.home_team_name}</h2>
                    </div>
                    <div className="font-bold text-4xl text-gray-400 dark:text-gray-500 px-8">VS</div>
                    <div className="flex flex-col items-center">
                        <ImageWithFallback src={fixture.away_team_logo} alt={fixture.away_team_name} className="w-20 h-20 mb-2 object-contain"/>
                        <h2 className="text-xl font-semibold">{fixture.away_team_name}</h2>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-center">Match Outcome Probabilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <OutcomePrediction label={`${fixture.home_team_name} Win`} value={fixture.home_win_pct} />
                        <OutcomePrediction label="Draw" value={fixture.draw_pct} />
                        <OutcomePrediction label={`${fixture.away_team_name} Win`} value={fixture.away_win_pct} />
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-xl font-bold mb-4 text-center">Goal Predictions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="font-semibold">Both Teams to Score</span>
                                <span className="text-2xl font-bold text-accent">{fixture.btts_pct}%</span>
                            </div>
                            <ProbabilityBar value={fixture.btts_pct} />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Likelihood of both teams scoring at least one goal.</p>
                        </div>
                         <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="font-semibold">Over 2.5 Goals</span>
                                <span className="text-2xl font-bold text-accent">{fixture.over25_pct}%</span>
                            </div>
                            <ProbabilityBar value={fixture.over25_pct} />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Likelihood of total goals being three or more.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FixtureDetail;
