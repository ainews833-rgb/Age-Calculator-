'use client';

import React, { useState } from 'react';
import {
  DateParts,
  calculateDateDifference,
  DateDifferenceResult,
  formatNumber,
  formatFullDate,
  formatMediumDate,
  parseISODate,
  MONTH_NAMES,
  getDaysInMonth,
  isValidDate,
} from '@/lib/date-utils';
import {
  ArrowRightLeft,
  Calendar,
  Clock,
  Briefcase,
  SunMedium,
  CheckCircle,
  Sparkles,
  Zap,
} from 'lucide-react';

export function DateDifferenceCalc() {
  const today = new Date();
  const cYear = today.getFullYear();
  const cMonth = today.getMonth() + 1;
  const cDay = today.getDate();

  // Start Date (defaults to Jan 1 of current year)
  const [sYear, setSYear] = useState<number>(cYear);
  const [sMonth, setSMonth] = useState<number>(1);
  const [sDay, setSDay] = useState<number>(1);

  // End Date (defaults to Today)
  const [eYear, setEYear] = useState<number>(cYear);
  const [eMonth, setEMonth] = useState<number>(cMonth);
  const [eDay, setEDay] = useState<number>(cDay);

  const [result, setResult] = useState<DateDifferenceResult | null>(() => {
    return calculateDateDifference(
      { year: cYear, month: 1, day: 1 },
      { year: cYear, month: cMonth, day: cDay }
    );
  });

  const maxSDays = getDaysInMonth(sYear, sMonth);
  const maxEDays = getDaysInMonth(eYear, eMonth);

  const handleCalculate = () => {
    if (!isValidDate(sYear, sMonth, sDay) || !isValidDate(eYear, eMonth, eDay)) {
      return;
    }

    const calc = calculateDateDifference(
      { year: sYear, month: sMonth, day: sDay },
      { year: eYear, month: eMonth, day: eDay }
    );
    setResult(calc);
  };

  const handleSwap = () => {
    const tempY = sYear;
    const tempM = sMonth;
    const tempD = sDay;

    setSYear(eYear);
    setSMonth(eMonth);
    setSDay(eDay);

    setEYear(tempY);
    setEMonth(tempM);
    setEDay(tempD);

    const calc = calculateDateDifference(
      { year: eYear, month: eMonth, day: eDay },
      { year: tempY, month: tempM, day: tempD }
    );
    setResult(calc);
  };

  const handleSetStartToday = () => {
    setSYear(cYear);
    setSMonth(cMonth);
    setSDay(cDay);
  };

  const handleSetEndToday = () => {
    setEYear(cYear);
    setEMonth(cMonth);
    setEDay(cDay);
  };

  const sISO = `${sYear}-${String(sMonth).padStart(2, '0')}-${String(sDay).padStart(2, '0')}`;
  const eISO = `${eYear}-${String(eMonth).padStart(2, '0')}-${String(eDay).padStart(2, '0')}`;

  const yearsList = Array.from({ length: 150 }, (_, i) => cYear + 25 - i);
  const sDaysList = Array.from({ length: maxSDays }, (_, i) => i + 1);
  const eDaysList = Array.from({ length: maxEDays }, (_, i) => i + 1);

  return (
    <div
      id="date-difference"
      className="bg-[#18181b] rounded-2xl shadow-2xl border border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
            Date Difference Calculator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Calculate the exact duration, working days, and elapsed time between any two dates
          </p>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors self-start sm:self-auto"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Swap Dates
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Start Date */}
        <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-bold text-white">
              Start Date
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSetStartToday}
                className="text-xs px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded font-medium border border-indigo-800"
              >
                Today
              </button>
              <input
                type="date"
                value={sISO}
                onChange={(e) => {
                  const parsed = parseISODate(e.target.value);
                  if (parsed) {
                    setSYear(parsed.year);
                    setSMonth(parsed.month);
                    setSDay(parsed.day);
                  }
                }}
                className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label htmlFor="diff-start-month" className="block text-[11px] font-semibold text-zinc-400 mb-1">Month</label>
              <select
                id="diff-start-month"
                value={sMonth}
                onChange={(e) => setSMonth(Number(e.target.value))}
                className="w-full h-10 px-2 bg-[#09090b] border border-zinc-700 rounded-lg text-xs font-medium text-white"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx + 1}>
                    {idx + 1} - {m.substring(0, 3)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="diff-start-day" className="block text-[11px] font-semibold text-zinc-400 mb-1">Day</label>
              <select
                id="diff-start-day"
                value={sDay}
                onChange={(e) => setSDay(Number(e.target.value))}
                className="w-full h-10 px-2 bg-[#09090b] border border-zinc-700 rounded-lg text-xs font-medium text-white"
              >
                {sDaysList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="diff-start-year" className="block text-[11px] font-semibold text-zinc-400 mb-1">Year</label>
              <select
                id="diff-start-year"
                value={sYear}
                onChange={(e) => setSYear(Number(e.target.value))}
                className="w-full h-10 px-2 bg-[#09090b] border border-zinc-700 rounded-lg text-xs font-medium text-white"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* End Date */}
        <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-bold text-white">
              End Date
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSetEndToday}
                className="text-xs px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded font-medium border border-indigo-800"
              >
                Today
              </button>
              <input
                type="date"
                value={eISO}
                onChange={(e) => {
                  const parsed = parseISODate(e.target.value);
                  if (parsed) {
                    setEYear(parsed.year);
                    setEMonth(parsed.month);
                    setEDay(parsed.day);
                  }
                }}
                className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label htmlFor="diff-end-month" className="block text-[11px] font-semibold text-zinc-400 mb-1">Month</label>
              <select
                id="diff-end-month"
                value={eMonth}
                onChange={(e) => setEMonth(Number(e.target.value))}
                className="w-full h-10 px-2 bg-[#09090b] border border-zinc-700 rounded-lg text-xs font-medium text-white"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx + 1}>
                    {idx + 1} - {m.substring(0, 3)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="diff-end-day" className="block text-[11px] font-semibold text-zinc-400 mb-1">Day</label>
              <select
                id="diff-end-day"
                value={eDay}
                onChange={(e) => setEDay(Number(e.target.value))}
                className="w-full h-10 px-2 bg-[#09090b] border border-zinc-700 rounded-lg text-xs font-medium text-white"
              >
                {eDaysList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="diff-end-year" className="block text-[11px] font-semibold text-zinc-400 mb-1">Year</label>
              <select
                id="diff-end-year"
                value={eYear}
                onChange={(e) => setEYear(Number(e.target.value))}
                className="w-full h-10 px-2 bg-[#09090b] border border-zinc-700 rounded-lg text-xs font-medium text-white"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleCalculate}
          className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <Zap className="w-4 h-4 fill-white" />
          Calculate Difference
        </button>
      </div>

      {/* Results View */}
      {result && (
        <div className="mt-6 pt-6 border-t border-zinc-800 animate-fadeIn">
          {/* Main Difference Banner */}
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-900/60 text-center">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Exact Calendar Duration
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              {result.years > 0 && `${result.years} Years, `}
              {result.months} Months, {result.days} Days
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              From {formatMediumDate(result.startDate)} to {formatMediumDate(result.endDate)}
            </p>
          </div>

          {/* Breakdown Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3.5 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
              <span className="block text-xl font-bold text-white">
                {formatNumber(result.totalDays)}
              </span>
              <span className="text-xs font-semibold text-zinc-400">
                Total Days
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
              <span className="block text-xl font-bold text-white">
                {formatNumber(result.totalWeeks)}
              </span>
              <span className="text-xs font-semibold text-zinc-400">
                Total Weeks
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
              <span className="block text-xl font-bold text-emerald-400">
                {formatNumber(result.weekdays)}
              </span>
              <span className="text-xs font-semibold text-zinc-400 flex items-center justify-center gap-1">
                <Briefcase className="w-3 h-3" /> Working Days
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
              <span className="block text-xl font-bold text-amber-400">
                {formatNumber(result.weekendDays)}
              </span>
              <span className="text-xs font-semibold text-zinc-400 flex items-center justify-center gap-1">
                <SunMedium className="w-3 h-3" /> Weekend Days
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
