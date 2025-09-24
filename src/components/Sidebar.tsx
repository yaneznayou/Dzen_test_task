import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslations } from '@/hooks/useTranslations'
import { user } from '@/data/mockData'

interface SidebarProps {
  currentPath: string
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const router = useRouter()
  const { t } = useTranslations()

  const navigationItems = [
    { path: '/orders', label: t('navigation.orders'), icon: '📦' },
    { path: '/groups', label: t('navigation.groups'), icon: '📁' },
    { path: '/products', label: t('navigation.products'), icon: '🖥️' },
    { path: '/users', label: t('navigation.users'), icon: '👥' },
    { path: '/settings', label: t('navigation.settings'), icon: '⚙️' },
  ]

  const isActive = (path: string) => {
    return currentPath === path
  }

  return (
    <aside className="fixed left-0 top-16 h-screen w-64 bg-gray-800 shadow-lg z-10 hidden lg:block">
      <div className="p-6">
        {}
        <div className="flex items-center space-x-3 mb-8">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">{user.name}</h3>
            <p className="text-gray-400 text-xs">{user.email}</p>
          </div>
        </div>

        {}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-1 h-6 bg-white rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
