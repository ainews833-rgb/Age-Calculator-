'use client';

import React, { useState, useEffect } from 'react';
import { AgeCalculationResult, formatFullDate, formatMediumDate } from '@/lib/date-utils';
import { Cake, Sparkles, PartyPopper, Calendar, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCountdownProps {
  result: AgeCalculationResult;
  leapRule: 'feb28' | 'mar1';
  onLeapRuleChange: (rule: 'feb28' | 'mar1') => void;
}

export function BirthdayCountdown({ result, leapRule, onLeapRuleChange }: BirthdayCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: result.daysUntilNextBirthday,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Trigger confetti if birthday is today
  useEffect(() => {
    if (result.isBirthdayToday) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [result.isBirthdayToday]);

  // Live timer counting down to next birthday midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const targetTime = result.nextBirthdayDate.getTime();
      const diffMs = targetTime - now.getTime();

      if (diffMs <= 0 || result.isBirthdayToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSec = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSec / (3600 * 24));
      const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [result.nextBirthdayDate, result.isBirthdayToday]);

  // Year completion progress percentage
  const totalDaysInYear = 365.25;
  const daysPassedSinceLastBday = Math.max(0, Math.round(365 - result.daysUntilNextBirthday));
  const progressPercent = Math.min(100, Math.max(0, Math.round((daysPassedSinceLastBday / 365) * 100)));

  return (
    <div
      id="birthday-countdown"
      className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-200/90 dark:border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-amber-950/60 dark:border-amber-800/50 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <Cake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Your Next Birthday
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Personal birthday countdown and age milestone prediction
            </p>
          </div>
        </div>

        {/* If birthday today or leap-day tag */}
        {result.isBirthdayToday ? (
          <button
            onClick={() => {
              confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md shadow-amber-500/20 hover:scale-105 transition-transform"
          >
            <PartyPopper className="w-4 h-4" /> 🎉 Happy Birthday! (Click for Confetti)
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {formatMediumDate(result.nextBirthdayDate)}
          </div>
        )}
      </div>

      {/* Main Birthday Hero Box */}
      {result.isBirthdayToday ? (
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 text-white text-center shadow-2xl animate-fadeIn">
          <PartyPopper className="w-12 h-12 mx-auto mb-2 animate-bounce" />
          <h3 className="text-2xl sm:text-4xl font-extrabold">🎉 HAPPY BIRTHDAY! 🎉</h3>
          <p className="mt-2 text-base text-amber-100 max-w-lg mx-auto">
            Today is your special day! You are officially turning{' '}
            <strong className="text-white text-lg underline">{result.years} years old</strong> today.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          {/* Main Turning Announcement */}
          <div className="p-4 sm:p-5 rounded-xl bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-900/60 mb-6">
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              You will turn{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                {result.nextBirthdayAge} years old
              </span>{' '}
              on{' '}
              <span className="underline decoration-indigo-400 font-semibold">
                {formatFullDate(result.nextBirthdayDate)}
              </span>
              .
            </p>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
              That is in exactly <strong className="text-slate-900 dark:text-zinc-200">{result.daysUntilNextBirthday} days</strong> (or{' '}
              <strong className="text-slate-900 dark:text-zinc-200">
                {result.weeksUntilNextBirthday} weeks and {result.remainingDaysAfterWeeks} days
              </strong>
              ).
            </p>
          </div>

          {/* Countdown Clock Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {timeLeft.days}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Days
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Hours
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Minutes
              </span>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800/80 shadow-xs">
              <span className="block text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Seconds
              </span>
            </div>
          </div>

          {/* Year Cycle Progress Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-zinc-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-2">
              <span>Current Age Cycle Progress</span>
              <span className="text-slate-900 dark:text-zinc-200">{progressPercent}% completed</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-[#09090b] rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Leap Day Explainer if born on Feb 29 */}
      {result.isFeb29Birthday && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm text-amber-900 dark:text-amber-100">Leap-Year Birthday (February 29)</span>
            <p className="mt-0.5 leading-relaxed text-amber-800 dark:text-amber-200/90">
              Because you were born on a leap day, in non-leap years your birthday is celebrated on{' '}
              <strong className="text-amber-950 dark:text-amber-100">{leapRule === 'mar1' ? 'March 1' : 'February 28'}</strong> according to your active setting.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="font-semibold text-[11px] text-slate-600 dark:text-zinc-300">Change Celebration Date:</span>
              <button
                type="button"
                onClick={() => onLeapRuleChange('feb28')}
                className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                  leapRule === 'feb28'
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800'
                }`}
              >
                Feb 28
              </button>
              <button
                type="button"
                onClick={() => onLeapRuleChange('mar1')}
                className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                  leapRule === 'mar1'
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800'
                }`}
              >
                March 1
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
