'use client';

import React, { useState } from 'react';
import {
  DateParts,
  calculateExactAge,
  formatFullDate,
  formatMediumDate,
  MONTH_NAMES,
  getDaysInMonth,
  isValidDate,
  parseISODate,
} from '@/lib/date-utils';
import {
  getBirthMonthAttributes,
  getWesternZodiac,
  getChineseZodiac,
  getGoldenBirthday,
  getHalfBirthday,
} from '@/lib/zodiac-utils';
import { Cake, Sparkles, Star, Calendar, PartyPopper, Award } from 'lucide-react';

export function BirthdayTool() {
  const today = new Date();
  const cYear = today.getFullYear();
  const cMonth = today.getMonth() + 1;
  const cDay = today.getDate();

  const [bYear, setBYear] = useState<number>(1995);
  const [bMonth, setBMonth] = useState<number>(6);
  const [bDay, setBDay] = useState<number>(15);

  const maxBDays = getDaysInMonth(bYear, bMonth);

  const birthParts: DateParts = { year: bYear, month: bMonth, day: bDay };
  const targetParts: DateParts = { year: cYear, month: cMonth, day: cDay };

  const calc = calculateExactAge(birthParts, targetParts);
  const monthAttr = getBirthMonthAttributes(bMonth);
  const zodiac = getWesternZodiac(bMonth, bDay);
  const chineseZodiac = getChineseZodiac(bYear);
  const goldenBday = getGoldenBirthday(bYear, bMonth, bDay);
  const halfBday = getHalfBirthday(bMonth, bDay);

  const bISO = `${bYear}-${String(bMonth).padStart(2, '0')}-${String(bDay).padStart(2, '0')}`;
  const yearsList = Array.from({ length: 130 }, (_, i) => cYear - i);
  const daysList = Array.from({ length: maxBDays }, (_, i) => i + 1);

  return (
    <div
      id="birthday-calc"
      className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-200/90 dark:border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cake className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            Dedicated Birthday Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
            Discover your day of birth, golden birthday, astrological sign, and next celebration
          </p>
        </div>
      </div>

      {/* Birthday Input Bar */}
      <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-bold text-slate-900 dark:text-white">
            Select Your Date of Birth
          </label>
          <input
            type="date"
            value={bISO}
            onChange={(e) => {
              const parsed = parseISODate(e.target.value);
              if (parsed) {
                setBYear(parsed.year);
                setBMonth(parsed.month);
                setBDay(parsed.day);
              }
            }}
            className="text-xs px-2 py-1 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-md text-slate-800 dark:text-zinc-200"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="bday-tool-month" className="block text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1">Month</label>
            <select
              id="bday-tool-month"
              value={bMonth}
              onChange={(e) => setBMonth(Number(e.target.value))}
              className="w-full h-11 px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white"
            >
              {MONTH_NAMES.map((m, idx) => (
                <option key={m} value={idx + 1}>
                  {idx + 1} - {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bday-tool-day" className="block text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1">Day</label>
            <select
              id="bday-tool-day"
              value={bDay}
              onChange={(e) => setBDay(Number(e.target.value))}
              className="w-full h-11 px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white"
            >
              {daysList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bday-tool-year" className="block text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1">Year</label>
            <select
              id="bday-tool-year"
              value={bYear}
              onChange={(e) => setBYear(Number(e.target.value))}
              className="w-full h-11 px-3 bg-white dark:bg-[#09090b] border border-slate-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white"
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

      {/* Birthday Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
            Current Age
          </span>
          <span className="block text-2xl font-black text-slate-900 dark:text-white mt-1">
            {calc.years} Years Old
          </span>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            {calc.months} months & {calc.days} days
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 shadow-xs">
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
            Next Birthday
          </span>
          <span className="block text-2xl font-black text-slate-900 dark:text-white mt-1">
            {calc.daysUntilNextBirthday === 0 ? 'Today! 🎉' : `${calc.daysUntilNextBirthday} Days`}
          </span>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Turning {calc.nextBirthdayAge} on {formatMediumDate(calc.nextBirthdayDate)} ({calc.nextBirthdayDayOfWeek})
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            Born On A
          </span>
          <span className="block text-2xl font-black text-slate-900 dark:text-white mt-1">
            {calc.dayOfWeekBorn}
          </span>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Season: {monthAttr.season} • {calc.isBirthYearLeapYear ? 'Leap Year' : 'Regular Year'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Western Zodiac
          </span>
          <span className="block text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
            {zodiac.symbol} {zodiac.sign} ({zodiac.element})
          </span>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            {zodiac.dateRange}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Golden Birthday
          </span>
          <span className="block text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Age {goldenBday.age} ({goldenBday.year})
          </span>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Turning the age of your birth day date
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Half-Birthday
          </span>
          <span className="block text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400" /> {halfBday.monthName} {halfBday.day}
          </span>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Celebrated 6 months from birth date
          </p>
        </div>
      </div>
    </div>
  );
}
