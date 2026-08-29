'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { MainCalculator } from '@/components/main-calculator';
import { ResultDashboard } from '@/components/result-dashboard';
import { BirthdayCountdown } from '@/components/birthday-countdown';
import { LifeInNumbers } from '@/components/life-in-numbers';
import { AgeUnitsTable } from '@/components/age-units-table';
import { DayOfBirthCard } from '@/components/day-of-birth-card';
import { DateDifferenceCalc } from '@/components/date-difference-calc';
import { BirthdayTool } from '@/components/birthday-tool';
import { AgeMilestones } from '@/components/age-milestones';
import { AiInsightsCard } from '@/components/ai-insights-card';
import { SavedHistory } from '@/components/saved-history';
import { FaqContent } from '@/components/faq-content';
import { ShareModal } from '@/components/share-modal';
import { Footer } from '@/components/footer';
import {
  DateParts,
  AgeCalculationResult,
  calculateExactAge,
} from '@/lib/date-utils';
import {
  HistoryItem,
  getHistory,
  saveHistoryItem,
  deleteHistoryItem,
  clearHistory,
} from '@/lib/history-storage';

export default function HomePage() {
  const today = new Date();
  const cYear = today.getFullYear();
  const cMonth = today.getMonth() + 1;
  const cDay = today.getDate();

  // Active calculator state
  const [birthParts, setBirthParts] = useState<DateParts>({
    year: 2000,
    month: 1,
    day: 15,
  });

  const [targetParts, setTargetParts] = useState<DateParts>({
    year: cYear,
    month: cMonth,
    day: cDay,
  });

  const [leapRule, setLeapRule] = useState<'feb28' | 'mar1'>('mar1');

  // Calculation Result
  const [result, setResult] = useState<AgeCalculationResult>(() => {
    return calculateExactAge(
      { year: 2000, month: 1, day: 15 },
      { year: cYear, month: cMonth, day: cDay },
      'mar1'
    );
  });

  // History & Storage state
  const [history, setHistory] = useState<HistoryItem[]>(getHistory);
  const [isSavedInHistory, setIsSavedInHistory] = useState(false);

  // Share modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Active navigation tab filter (optional quick jumping)
  const [activeTab, setActiveTab] = useState<'calculator' | 'diff' | 'birthday'>('calculator');


  // Calculation trigger handler
  const handleCalculate = (
    newBirth: DateParts,
    newTarget: DateParts,
    newLeapRule: 'feb28' | 'mar1'
  ) => {
    setBirthParts(newBirth);
    setTargetParts(newTarget);
    setLeapRule(newLeapRule);

    const calcResult = calculateExactAge(newBirth, newTarget, newLeapRule);
    setResult(calcResult);
    setIsSavedInHistory(false);
  };

  const handleReset = () => {
    const defaultBirth: DateParts = { year: 2000, month: 1, day: 15 };
    const defaultTarget: DateParts = { year: cYear, month: cMonth, day: cDay };
    setBirthParts(defaultBirth);
    setTargetParts(defaultTarget);
    setResult(calculateExactAge(defaultBirth, defaultTarget, 'mar1'));
    setIsSavedInHistory(false);
  };

  // Save to history
  const handleSaveToHistory = (label?: string) => {
    const item = saveHistoryItem(birthParts, targetParts, result, label);
    setHistory(getHistory());
    setIsSavedInHistory(true);
  };

  const handleDeleteHistory = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    setIsSavedInHistory(false);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setBirthParts(item.birthParts);
    setTargetParts(item.targetParts);
    const calc = calculateExactAge(item.birthParts, item.targetParts, leapRule);
    setResult(calc);
    setIsSavedInHistory(true);

    // Smooth scroll back to top of calculator
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Web Share or Modal Trigger
  const handleShare = async () => {
    const shareData = {
      title: 'Age Calculator Pro Result',
      text: `I am ${result.years} years, ${result.months} months, and ${result.days} days old (${result.totalDays.toLocaleString()} total days lived)! Calculated with Age Calculator Pro.`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to modal if cancelled or denied
      }
    }
    setShareModalOpen(true);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa] transition-colors">
      <Header
        onOpenHistory={() => {
          const el = document.getElementById('saved-history');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenPrint={handlePrint}
        onShare={handleShare}
        historyCount={history.length}
      />


      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Navigation Quick Filter Tabs */}
        <div className="no-print max-w-4xl mx-auto px-4 mb-6">
          <div className="flex items-center justify-center p-1.5 bg-[#18181b] border border-zinc-800 rounded-2xl w-full sm:w-auto mx-auto max-w-md">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-zinc-900 text-indigo-400 border border-zinc-700/80 shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Exact Age
            </button>
            <button
              onClick={() => setActiveTab('diff')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'diff'
                  ? 'bg-zinc-900 text-indigo-400 border border-zinc-700/80 shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Date Difference
            </button>
            <button
              onClick={() => setActiveTab('birthday')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'birthday'
                  ? 'bg-zinc-900 text-indigo-400 border border-zinc-700/80 shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Birthday Hub
            </button>
          </div>
        </div>

        <div className="px-4">
          {/* Main Primary View: Exact Age Calculator */}
          {activeTab === 'calculator' && (
            <>
              {/* Input Form Card */}
              <MainCalculator
                key={`${birthParts.year}-${birthParts.month}-${birthParts.day}-${targetParts.year}-${targetParts.month}-${targetParts.day}-${birthParts.hours ?? 0}-${birthParts.minutes ?? 0}`}
                initialBirthDate={birthParts}
                initialTargetDate={targetParts}
                onCalculate={handleCalculate}
                onReset={handleReset}
                leapRule={leapRule}
                onLeapRuleChange={(rule) => {
                  setLeapRule(rule);
                  setResult(calculateExactAge(birthParts, targetParts, rule));
                }}
              />


              {/* Primary Output Dashboard */}
              <ResultDashboard
                result={result}
                onShare={handleShare}
                onPrint={handlePrint}
                onSaveHistory={handleSaveToHistory}
                isSavedInHistory={isSavedInHistory}
              />

              {/* Birthday Countdown */}
              <BirthdayCountdown
                result={result}
                leapRule={leapRule}
                onLeapRuleChange={(rule) => {
                  setLeapRule(rule);
                  setResult(calculateExactAge(birthParts, targetParts, rule));
                }}
              />

              {/* Life in Numbers */}
              <LifeInNumbers result={result} />

              {/* Age in Different Units */}
              <AgeUnitsTable result={result} />

              {/* Day of Birth & Astrological trivia */}
              <DayOfBirthCard result={result} />

              {/* Coming Milestones */}
              <AgeMilestones result={result} />

              {/* AI Historical Era Insights */}
              <AiInsightsCard birthParts={birthParts} years={result.years} />
            </>
          )}

          {/* Tab 2: Date Difference Calculator */}
          {activeTab === 'diff' && (
            <>
              <DateDifferenceCalc />
              <FaqContent />
            </>
          )}

          {/* Tab 3: Dedicated Birthday Hub */}
          {activeTab === 'birthday' && (
            <>
              <BirthdayTool />
              <BirthdayCountdown
                result={result}
                leapRule={leapRule}
                onLeapRuleChange={(rule) => {
                  setLeapRule(rule);
                  setResult(calculateExactAge(birthParts, targetParts, rule));
                }}
              />
              <DayOfBirthCard result={result} />
            </>
          )}

          {/* Saved History */}
          <SavedHistory
            history={history}
            onSelect={handleSelectHistoryItem}
            onDelete={handleDeleteHistory}
            onClearAll={handleClearHistory}
          />

          {/* FAQ & Educational Content */}
          {activeTab === 'calculator' && <FaqContent />}
        </div>
      </main>

      <Footer />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={result}
      />
    </div>
  );
}
