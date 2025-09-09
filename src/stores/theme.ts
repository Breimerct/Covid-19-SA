import { defineStore } from 'pinia'
import { Dark } from 'quasar'

export const useThemeStore = defineStore('theme', () => {
  function themeToggle() {
    if (Dark.isActive) {
      Dark.set(false)
    } else {
      Dark.set(true)
    }

    localStorage.setItem('darkMode', JSON.stringify(Dark.isActive))
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      Dark.set(JSON.parse(savedTheme))
    }
  }

  return {
    themeToggle,
    initTheme
  }
})
