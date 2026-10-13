import { Heart, Skull, TestTubeDiagonal, UserGroup, type LucideIcon } from 'lucide-react';

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
  title: string;
  total: number;
  increment: number;
  icon: LucideIcon;
  textColor: CardColor;
};

export const DATA_CARDS: CardData[] = [
  {
    title: 'Pruebas',
    total: 4000000,
    increment: 0,
    icon: TestTubeDiagonal,
    textColor: 'yellow',
  },
  {
    title: 'Recuperados',
    total: 4000000,
    increment: 0,
    icon: Heart,
    textColor: 'green',
  },
  {
    title: 'Activos',
    total: 4000000,
    increment: 0,
    icon: UserGroup,
    textColor: 'blue',
  },
  {
    title: 'Fallecidos',
    total: 4000000,
    increment: 0,
    icon: Skull,
    textColor: 'red',
  },
];
