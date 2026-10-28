import type { MantineColorScheme } from '@mantine/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  colorScheme: MantineColorScheme;
};

type ThemeActions = {
  setColorScheme: (theme: MantineColorScheme) => void;

  toggleTheme: () => void;
};

const initialValues: ThemeState = {
  colorScheme: 'light',
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      ...initialValues,

      setColorScheme: theme => set({ colorScheme: theme }),

      toggleTheme: () => {
        const _this = get();
        const colorScheme = _this.colorScheme === 'light' ? 'dark' : 'light';

        set({ colorScheme });
      },
    }),
    { name: 'theme-store' }
  )
);
