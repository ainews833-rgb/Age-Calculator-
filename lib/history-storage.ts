import { DateParts, AgeCalculationResult } from './date-utils';

export interface HistoryItem {
  id: string;
  birthParts: DateParts;
  targetParts: DateParts;
  resultYears: number;
  resultMonths: number;
  resultDays: number;
  totalDays: number;
  timestamp: number;
  label?: string;
}

const STORAGE_KEY = 'age_calc_pro_saved_history_v2';
const MAX_HISTORY = 25;

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(
  birthParts: DateParts,
  targetParts: DateParts,
  result: AgeCalculationResult,
  label?: string
): HistoryItem {
  const newItem: HistoryItem = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    birthParts,
    targetParts,
    resultYears: result.years,
    resultMonths: result.months,
    resultDays: result.days,
    totalDays: result.totalDays,
    timestamp: Date.now(),
    label: label?.trim() || undefined,
  };

  if (typeof window !== 'undefined') {
    try {
      const current = getHistory();
      const filtered = current.filter(
        (it) =>
          !(
            it.birthParts.year === birthParts.year &&
            it.birthParts.month === birthParts.month &&
            it.birthParts.day === birthParts.day &&
            it.targetParts.year === targetParts.year &&
            it.targetParts.month === targetParts.month &&
            it.targetParts.day === targetParts.day
          )
      );
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  return newItem;
}

export function deleteHistoryItem(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getHistory();
    const updated = current.filter((it) => it.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
