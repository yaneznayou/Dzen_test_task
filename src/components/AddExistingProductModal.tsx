import React, { useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeModal, addExistingProductToOrder } from '@/store/slices/appSlice'
import { motion, AnimatePresence } from 'framer-motion'

const AddExistingProductModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { products, orders } = useAppSelector((state) => state.app)
  const { selectedOrder } = useAppSelector((state) => state.app)
  
  const [selectedType, setSelectedType] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const productTypes = useMemo(() => {
    const types = Array.from(new Set(products.map(p => p.type)))
    return types
  }, [products])

  const filteredProducts = useMemo(() => {
    const orderProductIds = selectedOrder?.products.map(p => p.id) || []
    
    return products.filter(product => {
      const typeMatch = !selectedType || product.type === selectedType
      const searchMatch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const notInOrder = !orderProductIds.includes(product.id)
      
      return typeMatch && searchMatch && notInOrder
    })
  }, [products, selectedType, searchTerm, selectedOrder])

  const handleProductToggle = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedProducts.length === 0) {
      alert('Выберите хотя бы один продукт')
      return
    }

    selectedProducts.forEach(productId => {
      dispatch(addExistingProductToOrder({
        productId,
        orderId: selectedOrder?.id || 1
      }))
    })

    dispatch(closeModal())
  }

  const handleCancel = () => {
    dispatch(closeModal())
  }

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
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Добавить существующий продукт в приход
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
            {}
            {selectedOrder && (
              <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-medium text-primary-900 mb-2">
                  Добавляем в приход: {selectedOrder.title}
                </h4>
                <p className="text-sm text-primary-700">
                  Текущее количество продуктов: {selectedOrder.products.length}
                </p>
              </div>
            )}

            {}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фильтр по типу
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="select-field w-full"
                >
                  <option value="">Все типы</option>
                  {productTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Поиск
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field"
                  placeholder="Поиск по названию или серийному номеру"
                />
              </div>
            </div>

            {}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">
                Доступные продукты
              </h4>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Выбрано: {selectedProducts.length}
                </span>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  {selectedProducts.length === filteredProducts.length ? 'Снять все' : 'Выбрать все'}
                </button>
              </div>
            </div>

            {}
            <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Нет доступных продуктов для добавления</p>
                  <p className="text-sm mt-2">Все продукты уже добавлены в этот приход</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedProducts.includes(product.id) ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => handleProductToggle(product.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleProductToggle(product.id)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 truncate">
                            {product.title}
                          </h5>
                          <p className="text-sm text-gray-600 truncate">
                            {product.serialNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.type} • {product.specification}
                          </p>
                        </div>

                        <div className="flex-shrink-0 flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.isNew ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {product.isNew ? 'Новый' : 'Б/У'}
                          </span>
                          <span className="text-sm text-gray-600">
                            {product.price.find(p => p.isDefault)?.value} {product.price.find(p => p.isDefault)?.symbol}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                ОТМЕНИТЬ
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedProducts.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ДОБАВИТЬ В ПРИХОД ({selectedProducts.length})
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AddExistingProductModal
