/**
 * Age Calculator Pro - High-precision Calendar & Date Arithmetic Utilities
 * Properly handles Leap Years, Feb 29 birthdays, month length variations, and custom target dates.
 */

export interface DateParts {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hours?: number; // 0-23
  minutes?: number; // 0-59
  seconds?: number; // 0-59
}

export interface AgeCalculationResult {
  birthDate: Date;
  targetDate: Date;
  birthParts: DateParts;
  targetParts: DateParts;
  // Exact calendar difference
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  // Total units
  totalDays: number;
  totalWeeks: number;
  remainingDaysInWeek: number;
  totalMonthsApprox: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  decimalYears: number;
  decimalMonths: number;
  // Birthday information
  isBirthdayToday: boolean;
  nextBirthdayDate: Date;
  nextBirthdayAge: number;
  daysUntilNextBirthday: number;
  weeksUntilNextBirthday: number;
  remainingDaysAfterWeeks: number;
  nextBirthdayDayOfWeek: string;
  // Birth info
  dayOfWeekBorn: string;
  isBirthYearLeapYear: boolean;
  isFeb29Birthday: boolean;
  leapDayRuleUsed: 'feb28' | 'mar1';
}

export interface DateDifferenceResult {
  startDate: Date;
  endDate: Date;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  remainingDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  weekdays: number;
  weekendDays: number;
  isReversed: boolean;
}

export interface MilestoneItem {
  age: number;
  date: Date;
  dayOfWeek: string;
  isPast: boolean;
  yearsDiff: number;
  monthsDiff: number;
  daysDiff: number;
  totalDaysDiff: number;
}

/**
 * Check if a year is a leap year in Gregorian calendar
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get number of days in a given month of a specific year (month is 1-12)
 */
export function getDaysInMonth(year: number, month: number): number {
  // Month in JS Date is 0-indexed. Passing 0 as day gets the last day of previous month.
  // So new Date(year, month, 0).getDate() gives the days in 'month' (1-12).
  return new Date(year, month, 0).getDate();
}

/**
 * Validate date parts
 */
export function isValidDate(year: number, month: number, day: number): boolean {
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
  if (year < 100 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  const maxDays = getDaysInMonth(year, month);
  if (day < 1 || day > maxDays) return false;
  return true;
}

/**
 * Create a Date object in Local Time at midnight from Y-M-D
 */
export function createLocalDate(year: number, month: number, day: number, hours = 0, minutes = 0, seconds = 0): Date {
  return new Date(year, month - 1, day, hours, minutes, seconds, 0);
}

/**
 * Format Date to YYYY-MM-DD
 */
export function formatDateToISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parse YYYY-MM-DD to DateParts
 */
export function parseISODate(isoStr: string): DateParts | null {
  if (!isoStr) return null;
  const parts = isoStr.split('-').map(Number);
  if (parts.length !== 3) return null;
  const [year, month, day] = parts;
  if (!isValidDate(year, month, day)) return null;
  return { year, month, day };
}

/**
 * Format Date to readable string: "Saturday, March 14, 2026"
 */
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format Date to medium string: "Mar 14, 2026"
 */
export function formatMediumDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export { DAYS_OF_WEEK, MONTH_NAMES };

/**
 * Primary Exact Calendar Age Calculation
 */
export function calculateExactAge(
  birth: DateParts,
  target: DateParts,
  leapDayRule: 'feb28' | 'mar1' = 'feb28'
): AgeCalculationResult {
  const birthYear = birth.year;
  const birthMonth = birth.month;
  const birthDay = birth.day;
  const birthHour = birth.hours ?? 0;
  const birthMin = birth.minutes ?? 0;
  const birthSec = birth.seconds ?? 0;

  const targetYear = target.year;
  const targetMonth = target.month;
  const targetDay = target.day;
  const targetHour = target.hours ?? 0;
  const targetMin = target.minutes ?? 0;
  const targetSec = target.seconds ?? 0;

  const birthDateObj = createLocalDate(birthYear, birthMonth, birthDay, birthHour, birthMin, birthSec);
  const targetDateObj = createLocalDate(targetYear, targetMonth, targetDay, targetHour, targetMin, targetSec);

  // Exact calendar arithmetic
  let years = targetYear - birthYear;
  let months = targetMonth - birthMonth;
  let days = targetDay - birthDay;

  // Day borrow logic
  if (days < 0) {
    // Borrow from previous month of target date
    const prevMonthYear = targetMonth === 1 ? targetYear - 1 : targetYear;
    const prevMonth = targetMonth === 1 ? 12 : targetMonth - 1;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    days += daysInPrevMonth;
    months -= 1;
  }

  // Month borrow logic
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Time difference (hours, minutes, seconds)
  let hours = targetHour - birthHour;
  let minutes = targetMin - birthMin;
  let seconds = targetSec - birthSec;

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
    if (days < 0) {
      const prevMonthYear = targetMonth === 1 ? targetYear - 1 : targetYear;
      const prevMonth = targetMonth === 1 ? 12 : targetMonth - 1;
      days += getDaysInMonth(prevMonthYear, prevMonth);
      months -= 1;
      if (months < 0) {
        months += 12;
        years -= 1;
      }
    }
  }

  // Total continuous elapsed time in UTC milliseconds
  const diffMs = targetDateObj.getTime() - birthDateObj.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysInWeek = totalDays % 7;
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);

  // Decimal conversions
  const decimalYears = Number((years + months / 12 + days / 365.2425).toFixed(4));
  const decimalMonths = Number((years * 12 + months + days / 30.4375).toFixed(2));
  const totalMonthsApprox = years * 12 + months;

  // Next Birthday Calculation
  const isFeb29 = birthMonth === 2 && birthDay === 29;

  // Helper to determine the month and day for birthday in a given year
  const getBdayMonthDay = (year: number) => {
    if (isFeb29) {
      if (isLeapYear(year)) {
        return { month: 2, day: 29 };
      } else {
        return leapDayRule === 'mar1' ? { month: 3, day: 1 } : { month: 2, day: 28 };
      }
    }
    return { month: birthMonth, day: birthDay };
  };

  // Test current target year's birthday
  const curBdayMD = getBdayMonthDay(targetYear);
  let nextBdayDate = createLocalDate(targetYear, curBdayMD.month, curBdayMD.day, 0, 0, 0);
  let nextBdayYear = targetYear;

  // Compare with target date at midnight
  const targetMidnight = createLocalDate(targetYear, targetMonth, targetDay, 0, 0, 0);
  
  let isBirthdayToday = false;
  if (curBdayMD.month === targetMonth && curBdayMD.day === targetDay) {
    isBirthdayToday = true;
  }

  if (nextBdayDate.getTime() < targetMidnight.getTime()) {
    // Already passed this year, next birthday is next year
    nextBdayYear = targetYear + 1;
    const nextBdayMD = getBdayMonthDay(nextBdayYear);
    nextBdayDate = createLocalDate(nextBdayYear, nextBdayMD.month, nextBdayMD.day, 0, 0, 0);
  }

  const nextBirthdayAge = nextBdayYear - birthYear;
  const msToNextBday = nextBdayDate.getTime() - targetMidnight.getTime();
  const daysUntilNextBirthday = Math.max(0, Math.round(msToNextBday / (1000 * 60 * 60 * 24)));
  const weeksUntilNextBirthday = Math.floor(daysUntilNextBirthday / 7);
  const remainingDaysAfterWeeks = daysUntilNextBirthday % 7;
  const nextBirthdayDayOfWeek = DAYS_OF_WEEK[nextBdayDate.getDay()];

  const dayOfWeekBorn = DAYS_OF_WEEK[birthDateObj.getDay()];
  const isBirthYearLeapYear = isLeapYear(birthYear);

  return {
    birthDate: birthDateObj,
    targetDate: targetDateObj,
    birthParts: birth,
    targetParts: target,
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalDays: Math.max(0, totalDays),
    totalWeeks: Math.max(0, totalWeeks),
    remainingDaysInWeek: Math.max(0, remainingDaysInWeek),
    totalMonthsApprox: Math.max(0, totalMonthsApprox),
    totalHours: Math.max(0, totalHours),
    totalMinutes: Math.max(0, totalMinutes),
    totalSeconds: Math.max(0, totalSeconds),
    decimalYears,
    decimalMonths,
    isBirthdayToday,
    nextBirthdayDate: nextBdayDate,
    nextBirthdayAge,
    daysUntilNextBirthday,
    weeksUntilNextBirthday,
    remainingDaysAfterWeeks,
    nextBirthdayDayOfWeek,
    dayOfWeekBorn,
    isBirthYearLeapYear,
    isFeb29Birthday: isFeb29,
    leapDayRuleUsed: leapDayRule,
  };
}

/**
 * Calculate Date Difference between two arbitrary dates
 */
export function calculateDateDifference(
  start: DateParts,
  end: DateParts
): DateDifferenceResult {
  let startDate = createLocalDate(start.year, start.month, start.day, start.hours ?? 0, start.minutes ?? 0);
  let endDate = createLocalDate(end.year, end.month, end.day, end.hours ?? 0, end.minutes ?? 0);

  let isReversed = false;
  if (startDate.getTime() > endDate.getTime()) {
    isReversed = true;
    const temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  const sYear = startDate.getFullYear();
  const sMonth = startDate.getMonth() + 1;
  const sDay = startDate.getDate();

  const eYear = endDate.getFullYear();
  const eMonth = endDate.getMonth() + 1;
  const eDay = endDate.getDate();

  let years = eYear - sYear;
  let months = eMonth - sMonth;
  let days = eDay - sDay;

  if (days < 0) {
    const prevMonthYear = eMonth === 1 ? eYear - 1 : eYear;
    const prevMonth = eMonth === 1 ? 12 : eMonth - 1;
    days += getDaysInMonth(prevMonthYear, prevMonth);
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const diffMs = endDate.getTime() - startDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);

  // Calculate business days (Monday-Friday) vs weekend days
  let weekdays = 0;
  let weekendDays = 0;
  const cur = new Date(startDate);
  while (cur.getTime() < endDate.getTime()) {
    const dayOfWeek = cur.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++;
    } else {
      weekdays++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  return {
    startDate,
    endDate,
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays: Math.max(0, totalDays),
    totalWeeks: Math.max(0, totalWeeks),
    remainingDays: Math.max(0, remainingDays),
    totalHours: Math.max(0, totalHours),
    totalMinutes: Math.max(0, totalMinutes),
    totalSeconds: Math.max(0, totalSeconds),
    weekdays,
    weekendDays,
    isReversed,
  };
}

/**
 * Calculate milestones for a given birth date relative to target date
 */
export function calculateMilestones(
  birth: DateParts,
  targetDate: Date,
  milestoneAges: number[] = [1, 5, 10, 13, 16, 18, 21, 25, 30, 40, 50, 60, 65, 70, 75, 80, 90, 100]
): { upcoming: MilestoneItem[]; past: MilestoneItem[] } {
  const upcoming: MilestoneItem[] = [];
  const past: MilestoneItem[] = [];

  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

  for (const age of milestoneAges) {
    const mYear = birth.year + age;
    let mMonth = birth.month;
    let mDay = birth.day;

    if (birth.month === 2 && birth.day === 29 && !isLeapYear(mYear)) {
      mDay = 28; // default to Feb 28 on non-leap years
    }

    const milestoneDate = createLocalDate(mYear, mMonth, mDay);
    const dayOfWeek = DAYS_OF_WEEK[milestoneDate.getDay()];
    const isPast = milestoneDate.getTime() <= targetMidnight.getTime();

    // Calculate diff between target and milestone
    const diffMs = Math.abs(milestoneDate.getTime() - targetMidnight.getTime());
    const totalDaysDiff = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let yearsDiff = 0;
    let monthsDiff = 0;
    let daysDiff = 0;

    if (isPast) {
      const calc = calculateExactAge(
        { year: milestoneDate.getFullYear(), month: milestoneDate.getMonth() + 1, day: milestoneDate.getDate() },
        { year: targetDate.getFullYear(), month: targetDate.getMonth() + 1, day: targetDate.getDate() }
      );
      yearsDiff = calc.years;
      monthsDiff = calc.months;
      daysDiff = calc.days;
    } else {
      const calc = calculateExactAge(
        { year: targetDate.getFullYear(), month: targetDate.getMonth() + 1, day: targetDate.getDate() },
        { year: milestoneDate.getFullYear(), month: milestoneDate.getMonth() + 1, day: milestoneDate.getDate() }
      );
      yearsDiff = calc.years;
      monthsDiff = calc.months;
      daysDiff = calc.days;
    }

    const item: MilestoneItem = {
      age,
      date: milestoneDate,
      dayOfWeek,
      isPast,
      yearsDiff,
      monthsDiff,
      daysDiff,
      totalDaysDiff,
    };

    if (isPast) {
      past.push(item);
    } else {
      upcoming.push(item);
    }
  }

  // Sort upcoming ascending, past descending
  upcoming.sort((a, b) => a.date.getTime() - b.date.getTime());
  past.sort((a, b) => b.date.getTime() - a.date.getTime());

  return { upcoming, past };
}

/**
 * Format numbers with thousand comma separators: 800841600 -> "800,841,600"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
