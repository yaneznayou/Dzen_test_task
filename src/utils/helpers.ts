import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDate = (dateString: string, formatString: string = 'dd/MM/yyyy', locale: string = 'ru'): string => {
  try {
    const date = parseISO(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    if (formatString === 'dd/MM/yyyy') {
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
    }
    
    return format(date, formatString, { locale: ru })
  } catch (error) {
    return dateString
  }
}

export const formatDateTime = (dateString: string, locale: string = 'ru'): string => {
  try {
    const date = parseISO(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  } catch (error) {
    return dateString
  }
}

export const formatDateShort = (dateString: string, locale: string = 'ru'): string => {
  try {
    const date = parseISO(dateString)
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()
    
    const monthTranslations = {
      ru: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
    
    const monthName = monthTranslations[locale as keyof typeof monthTranslations]?.[monthIndex] || monthTranslations.ru[monthIndex]
    
    return `${day}/${monthName}/${year}`
  } catch (error) {
    return dateString
  }
}

export const formatDateWithMonth = (dateString: string, locale: string = 'ru'): string => {
  try {
    const date = parseISO(dateString)
    const day = date.getDate()
    const monthIndex = date.getMonth()
    
    const monthTranslations = {
      ru: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
    
    const monthName = monthTranslations[locale as keyof typeof monthTranslations]?.[monthIndex] || monthTranslations.ru[monthIndex]
    
    return `${day} ${monthName}`
  } catch (error) {
    return dateString
  }
}

export const formatPrice = (price: number, symbol: string): string => {
  return `${price.toLocaleString('ru-RU')} ${symbol}`
}

export const getCurrentDateTime = (locale: string = 'ru'): { date: string; time: string } => {
  const now = new Date()
  const day = now.getDate()
  const monthIndex = now.getMonth()
  const year = now.getFullYear()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  
  const monthTranslations = {
    ru: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  
  const monthName = monthTranslations[locale as keyof typeof monthTranslations]?.[monthIndex] || monthTranslations.ru[monthIndex]
  const date = `${day} ${monthName}, ${year}`
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  
  return { date, time }
}

export const getWeekday = (locale: string = 'ru'): string => {
  const now = new Date()
  const dayIndex = now.getDay()
  
  const weekdayTranslations = {
    ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
  
  return weekdayTranslations[locale as keyof typeof weekdayTranslations]?.[dayIndex] || weekdayTranslations.ru[dayIndex]
}

export const calculateOrderTotal = (products: any[]): { usd: number; uah: number } => {
  return products.reduce(
    (totals, product) => {
      product.price.forEach((price: any) => {
        if (price.symbol === 'USD') {
          totals.usd += price.value
        } else if (price.symbol === 'UAH') {
          totals.uah += price.value
        }
      })
      return totals
    },
    { usd: 0, uah: 0 }
  )
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
