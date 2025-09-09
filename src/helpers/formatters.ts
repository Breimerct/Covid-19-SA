import moment from 'moment/moment'
import { i18n } from 'boot/i18n'
import Util from 'src/helpers/Util'

/**
 * Capitalizes the first letter of a string
 * @param value - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalizeFirstLetter(value: string): string {
  if (!value) return ''
  const processedValue = value.toLowerCase()
  return `${processedValue[0].toUpperCase()}${processedValue.slice(1)}`
}

/**
 * Capitalizes the first letter of each word in a string
 * @param value - The string to capitalize
 * @returns The string with each word capitalized
 */
export function capitalize(value: string): string {
  if (!value) return ''
  return value.toLowerCase().replace(/(?:^|\s)\S/g, (text: string) => (text || '').toString().toUpperCase())
}

/**
 * Formats a date using moment.js with locale support
 * @param value - The date value (number or string)
 * @returns The formatted date string
 */
export function formatDate(value: number | string): string {
  return moment(value)
    .locale(i18n.global.locale as string)
    .format('LLLL')
}

/**
 * Formats a number using the utility function
 * @param value - The number to format
 * @returns The formatted number string
 */
export function formatNumber(value: number): string {
  return Util.formatNumber(value)
}

// Default export with all formatters
export default {
  capitalizeFirstLetter,
  capitalize,
  formatDate,
  formatNumber
}
