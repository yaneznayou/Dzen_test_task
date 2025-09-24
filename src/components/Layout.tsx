import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCurrentTime, setCurrentDate } from '@/store/slices/appSlice'
import TopMenu from './TopMenu'
import Sidebar from './Sidebar'
import DeleteModal from './DeleteModal'
import AddProductModal from './AddProductModal'
import AddGroupModal from './AddGroupModal'
import AddExistingProductModal from './AddExistingProductModal'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentTime, currentDate } = useAppSelector((state) => state.app)
  const { type } = useAppSelector((state) => state.modal)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      const date = now.toLocaleDateString('ru-RU', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      })
      
      dispatch(setCurrentTime(time))
      dispatch(setCurrentDate(date))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <TopMenu />
      <div className="flex flex-col lg:flex-row">
        <Sidebar currentPath={router.pathname} />
        <main className="flex-1 lg:ml-64 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <DeleteModal />
      {type === 'add-product' && <AddProductModal />}
      {type === 'add-group' && <AddGroupModal />}
      {type === 'add-existing-product' && <AddExistingProductModal />}
    </div>
  )
}

export default Layout
