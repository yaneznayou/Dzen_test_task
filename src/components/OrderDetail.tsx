import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSelectedOrder, openModal } from '@/store/slices/appSlice'
import { useTranslations } from '@/hooks/useTranslations'
import { motion, AnimatePresence } from 'framer-motion'

const OrderDetail: React.FC = () => {
  const dispatch = useAppDispatch()
  const { selectedOrder } = useAppSelector((state) => state.app)
  const { t } = useTranslations()

  const handleClose = () => {
    dispatch(setSelectedOrder(null))
  }

  const handleDeleteProduct = (productId: number) => {
    dispatch(openModal({ type: 'delete', data: { type: 'product', id: productId } }))
  }

  if (!selectedOrder) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg min-h-[400px] lg:min-h-full">
        <div className="text-center text-gray-500 p-6">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">{t('orders.noSelection')}</p>
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
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {selectedOrder.title}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => dispatch(openModal({ type: 'add-product', data: null }))}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors w-full sm:w-auto"
            >
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-medium">{t('orders.addNew')}</span>
            </button>
            
            <button 
              onClick={() => dispatch(openModal({ type: 'add-existing-product', data: null }))}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors w-full sm:w-auto"
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">{t('orders.addExisting')}</span>
            </button>
          </div>
        </div>

        {}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {selectedOrder.products.map((product, index) => (
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
                </div>

                {}
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.isNew ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.isNew ? t('common.free') : t('common.inRepair')}
                  </span>
                </div>

                {}
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-1 lg:p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OrderDetail
