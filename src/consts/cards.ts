import { Heart, Skull, TestTubeDiagonal, UserGroup, type LucideIcon } from 'lucide-react';
import type { CovidData } from '../types';

export const CARD_COLORS = {
  red: {
    text: 'text-red-500',
    bg: 'bg-red-600! text-white!',
  },
  green: {
    text: 'text-green-600',
    bg: 'bg-green-600! text-white!',
  },
  blue: {
    text: 'text-blue-500',
    bg: 'bg-blue-500! text-white!',
  },
  yellow: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-400! text-white!',
  },
};

export type CardColor = keyof typeof CARD_COLORS;

export type CardData = {
  id: string;
  title: string;
  total: number;
  increment: number;
  icon: LucideIcon;
  textColor: CardColor;
};

export const DATA_CARDS: CardData[] = [
  {
    id: 'tests',
    title: 'Pruebas',
    total: 4000000,
    increment: 0,
    icon: TestTubeDiagonal,
    textColor: 'yellow',
  },
  {
    id: 'recovered',
    title: 'Recuperados',
    total: 4000000,
    increment: 0,
    icon: Heart,
    textColor: 'green',
  },
  {
    id: 'actives',
    title: 'Activos',
    total: 4000000,
    increment: 0,
    icon: UserGroup,
    textColor: 'blue',
  },
  {
    id: 'deaths',
    title: 'Fallecidos',
    total: 4000000,
    increment: 0,
    icon: Skull,
    textColor: 'red',
  },
];

export const generateCardWithCovidData = (covidData: CovidData | null): CardData[] => {
  if (!covidData) {
    return DATA_CARDS.map(card => ({
      ...card,
      increment: 0,
      total: 0,
    }));
  }

  const dataMap: Record<string, Pick<CardData, 'total' | 'increment'>> = {
    tests: { total: covidData.tests, increment: 0 },
    recovered: { total: covidData.recovered, increment: covidData.todayRecovered },
    actives: { total: covidData.active, increment: 0 },
    deaths: { total: covidData.deaths, increment: covidData.todayDeaths },
  };

  return DATA_CARDS.map(card => {
    const newData = dataMap[card.id];

    return newData ? { ...card, total: newData.total, increment: newData.increment } : card;
  });
};
