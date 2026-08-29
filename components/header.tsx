'use client';

import React, { useState } from 'react';
import { useTheme } from '@/lib/theme-provider';
import {
  Calendar,
  Sun,
  Moon,
  Share2,
  History,
  Menu,
  X,
  Printer,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenPrint: () => void;
  onShare: () => void;
  historyCount: number;
}

export function Header({ onOpenHistory, onOpenPrint, onShare, historyCount }: HeaderProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Age Calculator', href: '#calculator' },
    { name: 'Date Difference', href: '#date-difference' },
    { name: 'Birthday Calculator', href: '#birthday-calc' },
    { name: 'Milestones', href: '#milestones' },
    { name: 'Life Stats', href: '#life-stats' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#calculator" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">
                Age Calculator <span className="text-indigo-400">Pro</span>
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                v2.5
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Calculate your exact age instantly
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors"
            title="Recent Calculations History"
            aria-label="View calculation history"
          >
            <History className="w-5 h-5" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

          {/* Print Button */}
          <button
            onClick={onOpenPrint}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors hidden sm:flex"
            title="Print or Save Report"
            aria-label="Print or save age report"
          >
            <Printer className="w-5 h-5" />
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors"
            title="Share Result"
            aria-label="Share calculated age"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors"
            title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle dark and light theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-400" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#09090b] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 px-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Private Client-Side
            </span>
            <span>Accurate to Seconds</span>
          </div>
        </div>
      )}
    </header>
  );
}
