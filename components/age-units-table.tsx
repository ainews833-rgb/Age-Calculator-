'use client';

import React, { useState } from 'react';
import { AgeCalculationResult, formatNumber } from '@/lib/date-utils';
import { Layers, HelpCircle, Sparkles, Orbit, Compass, Clock } from 'lucide-react';

interface AgeUnitsTableProps {
  result: AgeCalculationResult;
}

export function AgeUnitsTable({ result }: AgeUnitsTableProps) {
  const [activeTab, setActiveTab] = useState<'standard' | 'comparative'>('standard');

  const standardUnits = [
    {
      unit: 'Years',
      value: `${result.decimalYears} Years`,
      breakdown: `${result.years} full years + ${result.months} months + ${result.days} days`,
      badge: 'Exact Calendar',
      tooltip: 'Calculated using standard Gregorian solar year length (365.2425 days average).',
    },
    {
      unit: 'Months',
      value: `${formatNumber(result.totalMonthsApprox)} Months`,
      breakdown: `${result.totalMonthsApprox} calendar months and ${result.days} remaining days`,
      badge: 'Exact Calendar',
      tooltip: 'Whole calendar months elapsed between birth month and target date.',
    },
    {
      unit: 'Weeks',
      value: `${formatNumber(result.totalWeeks)} Weeks`,
      breakdown: `${formatNumber(result.totalWeeks)} full weeks and ${result.remainingDaysInWeek} days`,
      badge: 'Exact (7-Day)',
      tooltip: 'Calculated by dividing total elapsed days by 7.',
    },
    {
      unit: 'Days',
      value: `${formatNumber(result.totalDays)} Days`,
      breakdown: `${formatNumber(result.totalDays)} continuous calendar days lived`,
      badge: 'Exact Count',
      tooltip: 'Exact continuous count of 24-hour calendar days from birth date to target date.',
    },
    {
      unit: 'Hours',
      value: `${formatNumber(result.totalHours)} Hours`,
      breakdown: `~${formatNumber(result.totalHours)} hours elapsed`,
      badge: result.birthParts.hours !== undefined ? 'Exact (with birth time)' : 'Standard (24h/day)',
      tooltip: 'Total days multiplied by 24 hours (or exact with provided birth hour/minute).',
    },
    {
      unit: 'Minutes',
      value: `${formatNumber(result.totalMinutes)} Minutes`,
      breakdown: `~${formatNumber(result.totalMinutes)} minutes elapsed`,
      badge: 'Standard (60m/hr)',
      tooltip: 'Total hours multiplied by 60 minutes.',
    },
    {
      unit: 'Seconds',
      value: `${formatNumber(result.totalSeconds)} Seconds`,
      breakdown: `~${formatNumber(result.totalSeconds)} seconds elapsed`,
      badge: 'Standard (60s/min)',
      tooltip: 'Total minutes multiplied by 60 seconds.',
    },
  ];

  // Fun comparative planetary & animal units
  const dogYears = (result.decimalYears <= 1 ? result.decimalYears * 15 : 15 + (result.decimalYears - 1) * 7).toFixed(1);
  const catYears = (result.decimalYears <= 1 ? result.decimalYears * 15 : 24 + (result.decimalYears - 2) * 4).toFixed(1);
  const marsYears = (result.decimalYears / 1.8808).toFixed(2);
  const lunarMonths = (result.totalDays / 29.53059).toFixed(1); // Synodic month

  const comparativeUnits = [
    {
      unit: 'Dog Age Equivalent',
      value: `${dogYears} Dog Years`,
      breakdown: 'First year = ~15 human years, subsequent years = ~7 years',
      badge: 'Approximate',
      tooltip: 'Based on veterinary age scaling guidelines.',
    },
    {
      unit: 'Cat Age Equivalent',
      value: `${catYears} Cat Years`,
      breakdown: 'First 2 years = ~24 human years, subsequent years = ~4 years',
      badge: 'Approximate',
      tooltip: 'Based on feline biological maturity curves.',
    },
    {
      unit: 'Mars Years (Planetary)',
      value: `${marsYears} Martian Years`,
      breakdown: '1 Mars year = 687 Earth days',
      badge: 'Astronomical',
      tooltip: 'Calculated using the orbital period of Mars around the Sun.',
    },
    {
      unit: 'Lunar Months (Moon Cycles)',
      value: `${lunarMonths} Moon Cycles`,
      breakdown: '1 Synodic Lunar Month = ~29.53 days',
      badge: 'Astronomical',
      tooltip: 'Number of full Moon-to-Moon cycles experienced.',
    },
  ];

  return (
    <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Your Age in Different Units
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Compare your chronological age across exact calendar and planetary units
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setActiveTab('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'standard'
                ? 'bg-[#18181b] text-indigo-400 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Standard Units
          </button>
          <button
            onClick={() => setActiveTab('comparative')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'comparative'
                ? 'bg-[#18181b] text-indigo-400 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Planetary & Animal
          </button>
        </div>
      </div>

      {/* Grid of unit cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6">
        {(activeTab === 'standard' ? standardUnits : comparativeUnits).map((item) => (
          <div
            key={item.unit}
            className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {item.unit}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                  {item.badge}
                </span>
              </div>
              <span className="block text-xl font-extrabold text-white">
                {item.value}
              </span>
              <p className="text-xs text-zinc-400 mt-1">
                {item.breakdown}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center gap-1.5 text-[11px] text-zinc-500">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="truncate" title={item.tooltip}>
                {item.tooltip}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
