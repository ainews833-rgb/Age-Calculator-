'use client';

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Send,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { AgeCalculationResult, formatNumber } from '@/lib/date-utils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AgeCalculationResult;
}

export function ShareModal({ isOpen, onClose, result }: ShareModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const shareText = `I am exactly ${result.years} years, ${result.months} months, and ${result.days} days old (${formatNumber(
    result.totalDays
  )} days lived)! Calculate yours with Age Calculator Pro.`;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://agecalculatorpro.app';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // fallback
    }
  };

  // Social share URLs
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
  const emailUrl = `mailto:?subject=My%20Exact%20Age%20Calculation&body=${encodedText}%0A%0ACalculate%20yours:%20${encodedUrl}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">
              Share Age Result
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Result summary card */}
        <div className="mt-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
          <span className="block text-2xl font-black text-indigo-400">
            {result.years}y {result.months}m {result.days}d
          </span>
          <p className="text-xs text-zinc-400 mt-1">
            {formatNumber(result.totalDays)} total days lived
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/40 text-emerald-300 border border-emerald-900/60 text-xs font-semibold hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-5 h-5 mb-1 text-emerald-400" />
            WhatsApp
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-950/40 text-sky-300 border border-sky-900/60 text-xs font-semibold hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5 mb-1 text-sky-400" />
            X / Twitter
          </a>

          <a
            href={emailUrl}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-950/40 text-indigo-300 border border-indigo-900/60 text-xs font-semibold hover:scale-105 transition-transform"
          >
            <Mail className="w-5 h-5 mb-1 text-indigo-400" />
            Email
          </a>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-5 space-y-2.5">
          <button
            onClick={handleCopyText}
            className="w-full h-10 px-4 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
          >
            {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copiedText ? 'Summary Copied to Clipboard!' : 'Copy Summary Text'}
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
            {copiedLink ? 'Link Copied to Clipboard!' : 'Copy Website Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
