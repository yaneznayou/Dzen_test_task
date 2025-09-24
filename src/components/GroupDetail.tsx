import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSelectedGroup, openModal } from '@/store/slices/appSlice'
import { useTranslations } from '@/hooks/useTranslations'
import { motion, AnimatePresence } from 'framer-motion'

const GroupDetail: React.FC = () => {
  const dispatch = useAppDispatch()
  const { selectedGroup } = useAppSelector((state) => state.app)
  const { t } = useTranslations()

  const handleClose = () => {
    dispatch(setSelectedGroup(null))
  }

  const handleDeleteProduct = (productId: number) => {
    dispatch(openModal({ type: 'delete', data: { type: 'product', id: productId } }))
  }

  if (!selectedGroup) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg min-h-[400px] lg:min-h-full">
        <div className="text-center text-gray-500 p-6">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-lg font-medium">{t('groups.noSelection')}</p>
          <p className="text-sm">для просмотра деталей</p>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="h-full bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col"
      >
        {}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {selectedGroup.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1 truncate">
              {selectedGroup.description}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors lg:hidden ml-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedGroup.products.length} {t('groups.productsCount')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('groups.description')}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => dispatch(openModal({ type: 'delete', data: { type: 'group', id: selectedGroup.id } }))}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {selectedGroup.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {}
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  product.isNew ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>

                {}
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 lg:w-6 lg:h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>

                {}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate text-sm lg:text-base">
                    {product.title}
                  </h4>
                  <p className="text-xs lg:text-sm text-gray-600 truncate">
                    {product.serialNumber}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {product.type} • {product.specification}
                  </p>
                </div>

                {}
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.isNew ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.isNew ? t('common.free') : t('common.inRepair')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default GroupDetail
