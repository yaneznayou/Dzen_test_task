import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setActiveSessions } from '@/store/slices/appSlice'
import { useTranslations } from '@/hooks/useTranslations'
import LanguageSwitcher from './LanguageSwitcher'
import { io, Socket } from 'socket.io-client'
import { shouldUseWebSocket, getWebSocketUrl } from '@/utils/websocket'
import { useRouter } from 'next/router'
import Link from 'next/link'

const TopMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const { currentTime, currentDate, activeSessions } = useAppSelector((state) => state.app)
  const { t } = useTranslations()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!shouldUseWebSocket()) {
      dispatch(setActiveSessions(1))
      return
    }

    const wsUrl = getWebSocketUrl()
    if (!wsUrl) return

    const newSocket = io(wsUrl, {
      transports: ['websocket']
    })

    newSocket.on('connect', () => {
      console.log('Connected to server')
    })

    newSocket.on('activeSessions', (count: number) => {
      dispatch(setActiveSessions(count))
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [dispatch])

  const getWeekday = () => {
    const weekdays = [
      t('header.sunday'),
      t('header.monday'),
      t('header.tuesday'),
      t('header.wednesday'),
      t('header.thursday'),
      t('header.friday'),
      t('header.saturday')
    ]
    return weekdays[new Date().getDay()]
  }

  const navigationItems = [
    { path: '/orders', label: t('navigation.orders'), icon: '📦' },
    { path: '/groups', label: t('navigation.groups'), icon: '📁' },
    { path: '/products', label: t('navigation.products'), icon: '🖥️' },
    { path: '/users', label: t('navigation.users'), icon: '👥' },
    { path: '/settings', label: t('navigation.settings'), icon: '⚙️' },
  ]

  const isActive = (path: string) => {
    return router.pathname === path
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-lg lg:text-xl font-bold text-primary-500">{t('navigation.inventory')}</h1>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('common.search')}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
            <div className="text-right hidden lg:block">
              <div className="text-sm font-medium text-gray-900">{getWeekday()}</div>
              <div className="text-sm text-gray-600">{currentDate}</div>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-900">{currentTime}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-primary-50 px-2 lg:px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-xs lg:text-sm font-medium text-primary-700">
              <span className="hidden sm:inline">{activeSessions} {t('header.activeSessions')}</span>
              <span className="sm:hidden">{activeSessions}</span>
            </span>
          </div>

          <LanguageSwitcher />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default TopMenu
