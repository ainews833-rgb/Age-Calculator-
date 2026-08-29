'use client';

import React from 'react';
import { AgeCalculationResult, formatFullDate, MONTH_NAMES } from '@/lib/date-utils';
import {
  getBirthMonthAttributes,
  getWesternZodiac,
  getChineseZodiac,
  getGeneration,
  getGoldenBirthday,
  getHalfBirthday,
} from '@/lib/zodiac-utils';
import {
  Calendar,
  Sparkles,
  Compass,
  Star,
  Flame,
  Award,
  Gem,
  Flower2,
  Users,
} from 'lucide-react';

interface DayOfBirthCardProps {
  result: AgeCalculationResult;
}

export function DayOfBirthCard({ result }: DayOfBirthCardProps) {
  const monthAttr = getBirthMonthAttributes(result.birthParts.month);
  const zodiac = getWesternZodiac(result.birthParts.month, result.birthParts.day);
  const chineseZodiac = getChineseZodiac(result.birthParts.year);
  const gen = getGeneration(result.birthParts.year);
  const goldenBday = getGoldenBirthday(result.birthParts.year, result.birthParts.month, result.birthParts.day);
  const halfBday = getHalfBirthday(result.birthParts.month, result.birthParts.day);

  return (
    <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            Day of Birth & Fun Milestones
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Astrological, generational, and cultural trivia about your birth date
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          {MONTH_NAMES[result.birthParts.month - 1]} {result.birthParts.day}, {result.birthParts.year}
        </span>
      </div>

      {/* Main Headline for Day of Birth */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-slate-900 to-indigo-950/80 border border-zinc-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">
            Day of the Week You Entered the World
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
            You were born on a <span className="text-amber-400 underline">{result.dayOfWeekBorn}</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-md">
            {formatFullDate(result.birthDate)} was a {result.isBirthYearLeapYear ? 'leap year' : 'standard 365-day year'}.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-center self-start sm:self-center border border-white/10">
          <span className="block text-[11px] text-indigo-200">Generation</span>
          <span className="font-bold text-sm text-white">{gen.name}</span>
        </div>
      </div>

      {/* Grid of facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Western Zodiac */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Western Zodiac
            </span>
            <span className="text-xl" title={zodiac.sign}>
              {zodiac.symbol}
            </span>
          </div>
          <span className="block text-lg font-bold text-white">
            {zodiac.sign}
          </span>
          <p className="text-xs text-zinc-400 mt-0.5">
            Element: <strong className="text-zinc-200">{zodiac.element}</strong> ({zodiac.dateRange})
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {zodiac.traits.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Chinese Zodiac */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Chinese Zodiac
            </span>
            <span className="text-xl">{chineseZodiac.emoji}</span>
          </div>
          <span className="block text-lg font-bold text-white">
            Year of the {chineseZodiac.animal}
          </span>
          <p className="text-xs text-zinc-400 mt-0.5">
            Element: <strong className="text-zinc-200">{chineseZodiac.element}</strong>
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {chineseZodiac.traits.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Birthstone & Flower */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Birthstone & Flower
            </span>
            <Gem className="w-4 h-4 text-purple-400" />
          </div>
          <div className="space-y-1.5 mt-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-300">
              <Gem className="w-3.5 h-3.5 text-indigo-400" />
              <span>Stone: <strong className="text-white">{monthAttr.stone}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-300">
              <Flower2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Flower: <strong className="text-white">{monthAttr.flower}</strong></span>
            </div>
          </div>
        </div>

        {/* Golden Birthday */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Golden Birthday
            </span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <span className="block text-base font-bold text-white">
            Turning {goldenBday.age} in {goldenBday.year}
          </span>
          <p className="text-xs text-zinc-400 mt-1">
            When you turn the age corresponding to your birth day number ({result.birthParts.day}th).
          </p>
        </div>

        {/* Half Birthday */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Half-Birthday
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="block text-base font-bold text-white">
            Every {halfBday.monthName} {halfBday.day}
          </span>
          <p className="text-xs text-zinc-400 mt-1">
            Exactly 6 months after your birthday for mid-year celebration!
          </p>
        </div>

        {/* Generation Persona */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Generation Era
            </span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="block text-base font-bold text-white">
            {gen.name} ({gen.period})
          </span>
          <p className="text-xs text-zinc-400 mt-1">
            {gen.description}
          </p>
        </div>
      </div>
    </div>
  );
}
