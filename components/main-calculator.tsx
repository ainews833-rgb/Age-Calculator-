'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Clock,
  ChevronDown,
  Check,
  Zap,
} from 'lucide-react';
import {
  DateParts,
  getDaysInMonth,
  isValidDate,
  MONTH_NAMES,
  createLocalDate,
  formatDateToISO,
  parseISODate,
} from '@/lib/date-utils';

interface MainCalculatorProps {
  initialBirthDate?: DateParts;
  initialTargetDate?: DateParts;
  onCalculate: (birth: DateParts, target: DateParts, leapRule: 'feb28' | 'mar1') => void;
  onReset: () => void;
  leapRule: 'feb28' | 'mar1';
  onLeapRuleChange: (rule: 'feb28' | 'mar1') => void;
}

export function MainCalculator({
  initialBirthDate,
  initialTargetDate,
  onCalculate,
  onReset,
  leapRule,
  onLeapRuleChange,
}: MainCalculatorProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Date of Birth state (default to Jan 15, 2000 as a great default)
  const [bYear, setBYear] = useState<number>(initialBirthDate?.year ?? 2000);
  const [bMonth, setBMonth] = useState<number>(initialBirthDate?.month ?? 1);
  const [bDay, setBDay] = useState<number>(initialBirthDate?.day ?? 15);

  // Target Date state (default to Today)
  const [tYear, setTYear] = useState<number>(initialTargetDate?.year ?? currentYear);
  const [tMonth, setTMonth] = useState<number>(initialTargetDate?.month ?? currentMonth);
  const [tDay, setTDay] = useState<number>(initialTargetDate?.day ?? currentDay);

  // Time of Birth optional toggle
  const [includeTime, setIncludeTime] = useState(false);
  const [bHour, setBHour] = useState<number>(0);
  const [bMin, setBMin] = useState<number>(0);

  // Error state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const maxBDays = getDaysInMonth(bYear, bMonth);
  const maxTDays = getDaysInMonth(tYear, tMonth);


  const handleBMonthChange = (m: number) => {
    setBMonth(m);
    const max = getDaysInMonth(bYear, m);
    if (bDay > max) setBDay(max);
  };

  const handleBYearChange = (y: number) => {
    setBYear(y);
    const max = getDaysInMonth(y, bMonth);
    if (bDay > max) setBDay(max);
  };

  const handleTMonthChange = (m: number) => {
    setTMonth(m);
    const max = getDaysInMonth(tYear, m);
    if (tDay > max) setTDay(max);
  };

  const handleTYearChange = (y: number) => {
    setTYear(y);
    const max = getDaysInMonth(y, tMonth);
    if (tDay > max) setTDay(max);
  };

  // Calculate handler with full validation
  const handleCalculate = () => {
    setErrorMsg(null);

    const activeBDay = Math.min(bDay, maxBDays);
    const activeTDay = Math.min(tDay, maxTDays);

    if (!isValidDate(bYear, bMonth, activeBDay)) {
      setErrorMsg(`Invalid Date of Birth: ${MONTH_NAMES[bMonth - 1] || bMonth} ${activeBDay}, ${bYear} does not exist.`);
      return;
    }

    if (!isValidDate(tYear, tMonth, activeTDay)) {
      setErrorMsg(`Invalid Target Date: ${MONTH_NAMES[tMonth - 1] || tMonth} ${activeTDay}, ${tYear} does not exist.`);
      return;
    }

    const birthDateObj = createLocalDate(bYear, bMonth, activeBDay, includeTime ? bHour : 0, includeTime ? bMin : 0);
    const targetDateObj = createLocalDate(tYear, tMonth, activeTDay, 23, 59, 59);

    if (birthDateObj.getTime() > targetDateObj.getTime()) {
      setErrorMsg('Birth date cannot be in the future relative to the selected target date.');
      return;
    }

    const birthParts: DateParts = {
      year: bYear,
      month: bMonth,
      day: activeBDay,
      hours: includeTime ? bHour : 0,
      minutes: includeTime ? bMin : 0,
      seconds: 0,
    };

    const targetParts: DateParts = {
      year: tYear,
      month: tMonth,
      day: activeTDay,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    onCalculate(birthParts, targetParts, leapRule);
  };


  const handleReset = () => {
    setBYear(2000);
    setBMonth(1);
    setBDay(15);
    setTYear(currentYear);
    setTMonth(currentMonth);
    setTDay(currentDay);
    setIncludeTime(false);
    setErrorMsg(null);
    onReset();
  };

  const handleSetTargetToday = () => {
    setTYear(currentYear);
    setTMonth(currentMonth);
    setTDay(currentDay);
  };

  const handlePresetSample = (y: number, m: number, d: number) => {
    setBYear(y);
    setBMonth(m);
    setBDay(d);
  };

  // Keyboard shortcut: Press Enter to calculate
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculate();
    }
  };

  // Generate Year options (1900 to currentYear + 20)
  const yearsList = Array.from({ length: currentYear - 1900 + 21 }, (_, i) => currentYear + 20 - i);
  const daysListB = Array.from({ length: maxBDays }, (_, i) => i + 1);
  const daysListT = Array.from({ length: maxTDays }, (_, i) => i + 1);

  // Sync with HTML date inputs
  const bISODate = `${bYear}-${String(bMonth).padStart(2, '0')}-${String(bDay).padStart(2, '0')}`;
  const tISODate = `${tYear}-${String(tMonth).padStart(2, '0')}-${String(tDay).padStart(2, '0')}`;

  const handleBDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseISODate(e.target.value);
    if (parsed) {
      setBYear(parsed.year);
      setBMonth(parsed.month);
      setBDay(parsed.day);
    }
  };

  const handleTDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseISODate(e.target.value);
    if (parsed) {
      setTYear(parsed.year);
      setTMonth(parsed.month);
      setTDay(parsed.day);
    }
  };

  return (
    <div
      id="calculator"
      onKeyDown={handleKeyDown}
      className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-200/90 dark:border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Exact Age Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
            Enter date of birth and target calculation date below
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-500">Presets:</span>
          <button
            type="button"
            onClick={() => handlePresetSample(2000, 1, 15)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-colors"
          >
            Jan 15, 2000
          </button>
          <button
            type="button"
            onClick={() => handlePresetSample(2000, 2, 29)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-colors"
            title="Leap Day Birthday"
          >
            Feb 29 (Leap)
          </button>
          <button
            type="button"
            onClick={() => handlePresetSample(1990, 8, 24)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-colors"
          >
            Aug 24, 1990
          </button>
        </div>
      </div>

      {/* Error alert message */}
      {errorMsg && (
        <div
          role="alert"
          className="mt-5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-sm flex items-start gap-2.5 animate-fadeIn"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
          <div>
            <p className="font-semibold text-rose-800 dark:text-rose-200">Calculation Notice</p>
            <p className="text-xs mt-0.5 text-rose-600 dark:text-rose-300/90">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Input Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Date of Birth Block */}
        <div className="bg-slate-50 dark:bg-zinc-900/60 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-bold text-slate-900 dark:text-white">
              1. Date of Birth <span className="text-rose-500 dark:text-rose-400">*</span>
            </label>
            {/* Native Date Picker sync */}
            <input
              type="date"
              value={bISODate}
              onChange={handleBDateInput}
              aria-label="Date of birth quick picker"
              className="text-xs px-2 py-1 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-md text-slate-800 dark:text-zinc-200 cursor-pointer focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Month */}
            <div>
              <label htmlFor="dob-month" className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Month
              </label>
              <select
                id="dob-month"
                value={bMonth}
                onChange={(e) => handleBMonthChange(Number(e.target.value))}
                className="w-full h-11 px-2.5 sm:px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx + 1}>
                    {idx + 1} - {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div>
              <label htmlFor="dob-day" className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Day
              </label>
              <select
                id="dob-day"
                value={bDay}
                onChange={(e) => setBDay(Number(e.target.value))}
                className="w-full h-11 px-2.5 sm:px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              >
                {daysListB.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label htmlFor="dob-year" className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Year
              </label>
              <select
                id="dob-year"
                value={bYear}
                onChange={(e) => handleBYearChange(Number(e.target.value))}
                className="w-full h-11 px-2.5 sm:px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Time of Birth Toggle */}
          <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-zinc-800/80">
            <button
              type="button"
              onClick={() => setIncludeTime(!includeTime)}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              {includeTime ? 'Hide exact birth time' : '+ Add birth time (optional)'}
            </button>

            {includeTime && (
              <div className="mt-2 grid grid-cols-2 gap-2 animate-fadeIn">
                <div>
                  <label htmlFor="dob-hour" className="block text-[11px] text-slate-600 dark:text-zinc-400 mb-0.5">
                    Hour (0-23)
                  </label>
                  <input
                    id="dob-hour"
                    type="number"
                    min="0"
                    max="23"
                    value={bHour}
                    onChange={(e) => setBHour(Math.min(23, Math.max(0, Number(e.target.value))))}
                    className="w-full h-9 px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="dob-min" className="block text-[11px] text-slate-600 dark:text-zinc-400 mb-0.5">
                    Minute (0-59)
                  </label>
                  <input
                    id="dob-min"
                    type="number"
                    min="0"
                    max="59"
                    value={bMin}
                    onChange={(e) => setBMin(Math.min(59, Math.max(0, Number(e.target.value))))}
                    className="w-full h-9 px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calculate Age As Of (Target Date) Block */}
        <div className="bg-slate-50 dark:bg-zinc-900/60 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-bold text-slate-900 dark:text-white">
              2. Calculate Age As Of
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSetTargetToday}
                className="text-xs px-2.5 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 dark:hover:bg-indigo-900 rounded font-medium border border-indigo-200 dark:border-indigo-800 transition-colors"
              >
                Today
              </button>
              <input
                type="date"
                value={tISODate}
                onChange={handleTDateInput}
                aria-label="Target date quick picker"
                className="text-xs px-2 py-1 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-md text-slate-800 dark:text-zinc-200 cursor-pointer focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Target Month */}
            <div>
              <label htmlFor="target-month" className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Month
              </label>
              <select
                id="target-month"
                value={tMonth}
                onChange={(e) => handleTMonthChange(Number(e.target.value))}
                className="w-full h-11 px-2.5 sm:px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx + 1}>
                    {idx + 1} - {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Day */}
            <div>
              <label htmlFor="target-day" className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Day
              </label>
              <select
                id="target-day"
                value={tDay}
                onChange={(e) => setTDay(Number(e.target.value))}
                className="w-full h-11 px-2.5 sm:px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              >
                {daysListT.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Year */}
            <div>
              <label htmlFor="target-year" className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Year
              </label>
              <select
                id="target-year"
                value={tYear}
                onChange={(e) => handleTYearChange(Number(e.target.value))}
                className="w-full h-11 px-2.5 sm:px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Feb 29 Leap Day Setting */}
          {bMonth === 2 && bDay === 29 && (
            <div className="mt-3.5 pt-3 border-t border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg">
              <span className="block text-[11px] font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Leap Day Birthday Rule (Non-Leap Years):
              </span>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1 cursor-pointer text-slate-700 dark:text-zinc-300">
                  <input
                    type="radio"
                    name="leapRule"
                    checked={leapRule === 'feb28'}
                    onChange={() => onLeapRuleChange('feb28')}
                    className="text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"
                  />
                  <span>February 28</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-slate-700 dark:text-zinc-300">
                  <input
                    type="radio"
                    name="leapRule"
                    checked={leapRule === 'mar1'}
                    onChange={() => onLeapRuleChange('mar1')}
                    className="text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"
                  />
                  <span>March 1</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={handleReset}
          className="order-2 sm:order-1 h-12 px-5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white focus:ring-2 focus:ring-indigo-500 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <button
          type="button"
          id="calculate-age-btn"
          onClick={handleCalculate}
          className="order-1 sm:order-2 flex-1 sm:flex-initial h-12 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#18181b] transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <Zap className="w-5 h-5 fill-white" />
          Calculate Exact Age
        </button>
      </div>
    </div>
  );
}
