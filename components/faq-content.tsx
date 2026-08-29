'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Cpu, Calendar, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does Age Calculator Pro determine exact age?',
    answer:
      'Age Calculator Pro uses the official Gregorian calendar arithmetic engine. Rather than relying on simplistic approximations (such as dividing elapsed days by 365.25), our algorithm counts full calendar years first, borrows calendar-exact days for remaining months according to the variable 28, 29, 30, or 31-day lengths of specific Gregorian months, and calculates the exact remaining days.',
    tag: 'Calculation Logic',
  },
  {
    question: 'How are leap years handled in calendar calculations?',
    answer:
      'A leap year contains 366 days instead of 365, occurring in years divisible by 4 (except century years unless divisible by 400). When calculating your age across leap years (such as 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028), every leap day lived is counted exactly in your total elapsed days, total hours, and remaining calendar days.',
    tag: 'Leap Years',
  },
  {
    question: 'What happens if I was born on a Leap Day (February 29)?',
    answer:
      'If you were born on February 29, our calculator gives you full control. In leap years, your birthday falls naturally on Feb 29. For non-leap years, you can toggle celebration rules between February 28 (the last day of February) and March 1 (the 60th day of the year, common in legal and insurance jurisdictions).',
    tag: 'Feb 29 Born',
  },
  {
    question: 'Why do different online age calculators show slightly different totals?',
    answer:
      'Many basic tools approximate 1 month as 30.4375 days or divide total days by 30, which creates 1-3 day drift errors. Age Calculator Pro uses the exact Gregorian calendar lookup for the exact years and months you have lived, ensuring 100% mathematical consistency without rounding drift.',
    tag: 'Accuracy',
  },
  {
    question: 'How does time of birth affect age calculations?',
    answer:
      'By default, calendar age is calculated as calendar date difference (from midnight of birth date to midnight of target date). If you enable the optional Time of Birth feature, our calculator incorporates exact hours and minutes lived to calculate second-by-second precision.',
    tag: 'Time Precision',
  },
  {
    question: 'Is my Date of Birth kept private and secure?',
    answer:
      'Yes, 100%. All calculations are executed directly in your browser using local JavaScript arithmetic. Your date of birth and calculation history never leave your computer or phone and are never stored on any remote tracking server.',
    tag: 'Privacy',
  },
];

export function FaqContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#18181b] rounded-2xl shadow-2xl border border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            Frequently Asked Questions & Methodology
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Everything you need to know about precision calendar age arithmetic
          </p>
        </div>
      </div>

      {/* Accordion FAQ list */}
      <div className="mt-6 space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-white hover:text-indigo-400 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800 hidden sm:inline-block">
                    {faq.tag}
                  </span>
                  <span className="text-sm sm:text-base font-bold">{faq.question}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800 mt-1 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Educational Article Box */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-indigo-950/30 border border-indigo-900/60">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          The Science of Gregorian Age Calculation
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          The Gregorian calendar was introduced in 1582 to correct the Julian calendar&apos;s drift against solar equinoxes. Because months vary from 28 to 31 days and leap years occur every 4 years (with 100-year and 400-year exceptions), chronological age calculation requires bidirectional month and year borrowing. Age Calculator Pro executes exact calendar arithmetic to guarantee that your age in years, months, and days is mathematically sound for legal, civil, medical, and personal applications.
        </p>
      </div>
    </section>
  );
}
