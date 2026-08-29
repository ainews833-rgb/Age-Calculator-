/**
 * Zodiac, Birthstone, Astrological & Cultural Fun Facts for Age Calculator Pro
 */

export interface WesternZodiac {
  sign: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dateRange: string;
  traits: string[];
}

export interface ChineseZodiac {
  animal: string;
  element: string;
  emoji: string;
  traits: string[];
}

export interface GenerationInfo {
  name: string;
  period: string;
  description: string;
}

export interface BirthMonthAttributes {
  monthName: string;
  stone: string;
  flower: string;
  season: string;
}

const MONTH_ATTRIBUTES: Record<number, BirthMonthAttributes> = {
  1: { monthName: 'January', stone: 'Garnet', flower: 'Carnation & Snowdrop', season: 'Winter' },
  2: { monthName: 'February', stone: 'Amethyst', flower: 'Violet & Primrose', season: 'Winter' },
  3: { monthName: 'March', stone: 'Aquamarine', flower: 'Daffodil', season: 'Spring' },
  4: { monthName: 'April', stone: 'Diamond', flower: 'Daisy & Sweet Pea', season: 'Spring' },
  5: { monthName: 'May', stone: 'Emerald', flower: 'Lily of the Valley & Hawthorn', season: 'Spring' },
  6: { monthName: 'June', stone: 'Pearl & Alexandrite', flower: 'Rose & Honeysuckle', season: 'Summer' },
  7: { monthName: 'July', stone: 'Ruby', flower: 'Larkspur & Water Lily', season: 'Summer' },
  8: { monthName: 'August', stone: 'Peridot & Spinel', flower: 'Gladiolus & Poppy', season: 'Summer' },
  9: { monthName: 'September', stone: 'Sapphire', flower: 'Aster & Morning Glory', season: 'Autumn' },
  10: { monthName: 'October', stone: 'Opal & Tourmaline', flower: 'Marigold & Cosmos', season: 'Autumn' },
  11: { monthName: 'November', stone: 'Topaz & Citrine', flower: 'Chrysanthemum', season: 'Autumn' },
  12: { monthName: 'December', stone: 'Tanzanite & Turquoise', flower: 'Narcissus & Holly', season: 'Winter' },
};

export function getBirthMonthAttributes(month: number): BirthMonthAttributes {
  return MONTH_ATTRIBUTES[month] || MONTH_ATTRIBUTES[1];
}

export function getWesternZodiac(month: number, day: number): WesternZodiac {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: 'Aries', symbol: '♈', element: 'Fire', dateRange: 'Mar 21 – Apr 19', traits: ['Courageous', 'Energetic', 'Passionate'] };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: 'Taurus', symbol: '♉', element: 'Earth', dateRange: 'Apr 20 – May 20', traits: ['Reliable', 'Patient', 'Practical'] };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: 'Gemini', symbol: '♊', element: 'Air', dateRange: 'May 21 – Jun 20', traits: ['Curious', 'Adaptable', 'Witty'] };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: 'Cancer', symbol: '♋', element: 'Water', dateRange: 'Jun 21 – Jul 22', traits: ['Intuitive', 'Loyal', 'Empathetic'] };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: 'Leo', symbol: '♌', element: 'Fire', dateRange: 'Jul 23 – Aug 22', traits: ['Confident', 'Generous', 'Charismatic'] };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: 'Virgo', symbol: '♍', element: 'Earth', dateRange: 'Aug 23 – Sep 22', traits: ['Analytical', 'Meticulous', 'Helpful'] };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: 'Libra', symbol: '♎', element: 'Air', dateRange: 'Sep 23 – Oct 22', traits: ['Diplomatic', 'Harmonious', 'Charming'] };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: 'Scorpio', symbol: '♏', element: 'Water', dateRange: 'Oct 23 – Nov 21', traits: ['Resourceful', 'Brave', 'Focused'] };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: 'Sagittarius', symbol: '♐', element: 'Fire', dateRange: 'Nov 22 – Dec 21', traits: ['Optimistic', 'Adventurous', 'Philosophical'] };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: 'Capricorn', symbol: '♑', element: 'Earth', dateRange: 'Dec 22 – Jan 19', traits: ['Disciplined', 'Ambitious', 'Pragmatic'] };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: 'Aquarius', symbol: '♒', element: 'Air', dateRange: 'Jan 20 – Feb 18', traits: ['Innovative', 'Original', 'Humanitarian'] };
  }
  return { sign: 'Pisces', symbol: '♓', element: 'Water', dateRange: 'Feb 19 – Mar 20', traits: ['Compassionate', 'Artistic', 'Wise'] };
}

const CHINESE_ANIMALS = [
  { animal: 'Rat', emoji: '🐀', traits: ['Quick-witted', 'Resourceful', 'Versatile'] },
  { animal: 'Ox', emoji: '🐂', traits: ['Diligent', 'Dependable', 'Determined'] },
  { animal: 'Tiger', emoji: '🐅', traits: ['Brave', 'Confident', 'Competitive'] },
  { animal: 'Rabbit', emoji: '🐇', traits: ['Quiet', 'Elegant', 'Kind'] },
  { animal: 'Dragon', emoji: '🐉', traits: ['Confident', 'Intelligent', 'Enthusiastic'] },
  { animal: 'Snake', emoji: '🐍', traits: ['Enigmatic', 'Intelligent', 'Wise'] },
  { animal: 'Horse', emoji: '🐎', traits: ['Animated', 'Active', 'Energetic'] },
  { animal: 'Goat', emoji: '🐐', traits: ['Calm', 'Gentle', 'Sympathetic'] },
  { animal: 'Monkey', emoji: '🐒', traits: ['Sharp', 'Smart', 'Curious'] },
  { animal: 'Rooster', emoji: '🐓', traits: ['Observant', 'Hardworking', 'Courageous'] },
  { animal: 'Dog', emoji: '🐕', traits: ['Lovely', 'Honest', 'Prudent'] },
  { animal: 'Pig', emoji: '🐖', traits: ['Compassionate', 'Generous', 'Diligent'] },
];

const CHINESE_ELEMENTS = ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'];

export function getChineseZodiac(year: number): ChineseZodiac {
  // 1900 was the year of the Metal Rat (index 0)
  const offset = (year - 1900) % 12;
  const animalIndex = (offset + 12) % 12;
  const animalData = CHINESE_ANIMALS[animalIndex];

  // Element cycle (10-year cycle)
  const lastDigit = Math.abs(year) % 10;
  const element = CHINESE_ELEMENTS[lastDigit];

  return {
    animal: animalData.animal,
    element,
    emoji: animalData.emoji,
    traits: animalData.traits,
  };
}

export function getGeneration(year: number): GenerationInfo {
  if (year >= 2025) {
    return { name: 'Generation Beta', period: '2025–2039', description: 'The next generation growing up in an interconnected AI-native world.' };
  }
  if (year >= 2013) {
    return { name: 'Generation Alpha', period: '2013–2024', description: 'First generation born completely in the 21st century and mobile technology era.' };
  }
  if (year >= 1997) {
    return { name: 'Generation Z', period: '1997–2012', description: 'Digital natives renowned for tech fluency, creativity, and self-expression.' };
  }
  if (year >= 1981) {
    return { name: 'Millennials (Gen Y)', period: '1981–1996', description: 'Pioneered the transition from analog to internet-connected digital lifestyles.' };
  }
  if (year >= 1965) {
    return { name: 'Generation X', period: '1965–1980', description: 'Independent, resourceful bridge generation across major cultural transitions.' };
  }
  if (year >= 1946) {
    return { name: 'Baby Boomers', period: '1946–1964', description: 'Post-WWII generation characterized by strong work ethic and cultural transformation.' };
  }
  if (year >= 1928) {
    return { name: 'Silent Generation', period: '1928–1945', description: 'Resilient and community-minded generation shaped by mid-century milestones.' };
  }
  return { name: 'Greatest Generation', period: 'Before 1928', description: 'Historic generation who persevered through the early 20th century.' };
}

/**
 * Calculate Golden Birthday
 * A golden birthday occurs when someone turns the age of the day of the month they were born.
 * E.g., born on May 24th -> Golden Birthday is on their 24th birthday (Year = birthYear + 24).
 */
export function getGoldenBirthday(birthYear: number, birthMonth: number, birthDay: number): {
  age: number;
  year: number;
  dateStr: string;
} {
  const age = birthDay;
  const year = birthYear + age;
  return {
    age,
    year,
    dateStr: `${MONTH_ATTRIBUTES[birthMonth]?.monthName || 'Month'} ${birthDay}, ${year}`,
  };
}

/**
 * Calculate Half Birthday
 * Exactly 6 months after the birth date
 */
export function getHalfBirthday(birthMonth: number, birthDay: number): {
  monthName: string;
  day: number;
} {
  let halfMonth = birthMonth + 6;
  if (halfMonth > 12) halfMonth -= 12;
  return {
    monthName: MONTH_ATTRIBUTES[halfMonth]?.monthName || 'Month',
    day: birthDay > 30 && (halfMonth === 2 || halfMonth === 4 || halfMonth === 6 || halfMonth === 9 || halfMonth === 11) ? 30 : birthDay,
  };
}

/**
 * Estimate Biological & Cosmic stats based on total days lived
 */
export function calculateLifeStats(totalDays: number) {
  // Average resting heart rate ~ 75-80 bpm => ~110,000 beats/day
  const heartbeats = Math.round(totalDays * 110000);
  
  // Average breaths ~ 16 breaths/min => ~23,040 breaths/day
  const breaths = Math.round(totalDays * 23040);
  
  // Sleep hours ~ 8 hrs/day (approx 1/3 of life)
  const sleepHours = Math.round(totalDays * 8);
  const sleepDays = Math.round(sleepHours / 24);

  // Earth travels around the Sun at ~29.78 km/s => ~2.573 million km per day
  const cosmicDistanceMillionKm = Number((totalDays * 2.573).toFixed(1));

  // Times Earth orbited Sun
  const orbitsSun = Number((totalDays / 365.2425).toFixed(2));

  // Blinks: ~15-20 blinks per min, 16 awake hours => ~17,000 blinks/day
  const blinks = Math.round(totalDays * 17000);

  return {
    heartbeats,
    breaths,
    sleepHours,
    sleepDays,
    cosmicDistanceMillionKm,
    orbitsSun,
    blinks,
  };
}
