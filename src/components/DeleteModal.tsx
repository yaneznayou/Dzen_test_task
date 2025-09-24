import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeModal, deleteOrder, deleteProduct, deleteGroup } from '@/store/slices/appSlice'
import { useTranslations } from '@/hooks/useTranslations'
import { motion, AnimatePresence } from 'framer-motion'

const DeleteModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, type, data } = useAppSelector((state) => state.modal)
  const { t } = useTranslations()

  const handleConfirm = () => {
    if (type === 'delete') {
      if (data.type === 'product') {
        dispatch(deleteProduct(data.id))
      } else if (data.type === 'group') {
        dispatch(deleteGroup(data.id))
      } else {
        dispatch(deleteOrder(data.id))
      }
    }
    dispatch(closeModal())
  }

  const handleCancel = () => {
    dispatch(closeModal())
  }

  if (!isOpen || type !== 'delete') return null

  const isProduct = data?.type === 'product'
  const isGroup = data?.type === 'group'
  const title = isProduct
    ? `${t('modals.delete.confirm')} ${t('modals.delete.product')}?`
    : isGroup
    ? `${t('modals.delete.confirm')} ${t('modals.delete.group')}?`
    : `${t('modals.delete.confirm')} ${t('modals.delete.order')}?`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {}
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Активный</span>
                </div>
                <h4 className="font-medium text-gray-900">
                  Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3
                </h4>
                <p className="text-sm text-gray-600">
                  SN-12.3456789
                </p>
              </div>
            </div>
          </div>

          {}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="btn-secondary"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleConfirm}
              className="btn-danger flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
              </svg>
              <span>{t('common.delete')}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DeleteModal
