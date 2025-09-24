import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSelectedOrder, openModal } from '@/store/slices/appSlice'
import { useTranslations } from '@/hooks/useTranslations'
import { formatDateWithMonth, calculateOrderTotal, formatPrice } from '@/utils/helpers'
import { motion } from 'framer-motion'

const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { orders, selectedOrder } = useAppSelector((state) => state.app)
  const { t, locale } = useTranslations()

  const handleOrderClick = (order: any) => {
    dispatch(setSelectedOrder(order))
  }

  const handleDeleteClick = (e: React.MouseEvent, order: any) => {
    e.stopPropagation()
    dispatch(openModal({ type: 'delete', data: order }))
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('orders.title')} / {orders.length}
          </h1>
        </div>
      </div>

      {}
      <div className="space-y-4">
        {orders.map((order, index) => {
          const totals = calculateOrderTotal(order.products)
          const isSelected = selectedOrder?.id === order.id
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''
              }`}
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex items-center justify-between">
                {}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {order.title}
                  </h3>
                  
                  <div className="flex items-center space-x-6">
                    {}
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">
                        {order.products.length} {t('orders.productsCount')}
                      </span>
                    </div>

                    {}
                    <div className="text-sm text-gray-600">
                      {formatDateWithMonth(order.date, locale)}
                    </div>
                  </div>
                </div>

                {}
                <div className="flex items-center space-x-4">
                  {}
                  <div className="text-right">
                    {totals.usd > 0 && (
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(totals.usd, 'USD')}
                      </div>
                    )}
                    {totals.uah > 0 && (
                      <div className="text-sm text-gray-600">
                        {formatPrice(totals.uah, 'UAH')}
                      </div>
                    )}
                  </div>

                  {}
                  <button
                    onClick={(e) => handleDeleteClick(e, order)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {}
                  {isSelected && (
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default OrdersList
