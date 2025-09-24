import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeModal, addProduct } from '@/store/slices/appSlice'
import { useTranslations } from '@/hooks/useTranslations'
import { ProductFormData } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

const AddProductModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { orders, products } = useAppSelector((state) => state.app)
  
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    type: '',
    specification: '',
    serialNumber: '',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=1',
    guarantee: {
      start: '',
      end: ''
    },
    price: [
      { value: 0, symbol: 'USD', isDefault: false },
      { value: 0, symbol: 'UAH', isDefault: true }
    ],
    order: orders[0]?.id || 1
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const productTypes = [
    'Monitors',
    'Keyboards', 
    'Mice',
    'Processors',
    'Graphics Cards',
    'Motherboards',
    'RAM',
    'Storage',
    'Power Supplies',
    'Cases',
    'Cooling',
    'Audio'
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handlePriceChange = (index: number, field: string, value: any) => {
    const newPrices = [...formData.price]
    newPrices[index] = {
      ...newPrices[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      price: newPrices
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Название обязательно'
    if (!formData.type) newErrors.type = 'Тип обязателен'
    if (!formData.specification.trim()) newErrors.specification = 'Спецификация обязательна'
    if (!formData.serialNumber.trim()) newErrors.serialNumber = 'Серийный номер обязателен'
    if (!formData.guarantee.start) newErrors.guaranteeStart = 'Дата начала гарантии обязательна'
    if (!formData.guarantee.end) newErrors.guaranteeEnd = 'Дата окончания гарантии обязательна'
    if (formData.price[0].value <= 0) newErrors.priceUsd = 'Цена в USD должна быть больше 0'
    if (formData.price[1].value <= 0) newErrors.priceUah = 'Цена в UAH должна быть больше 0'

    if (formData.guarantee.start && formData.guarantee.end) {
      const startDate = new Date(formData.guarantee.start)
      const endDate = new Date(formData.guarantee.end)
      
      if (endDate <= startDate) {
        newErrors.guaranteeEnd = 'Дата окончания гарантии должна быть позже даты начала'
      }

      const diffInYears = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
      if (diffInYears > 10) {
        newErrors.guaranteeEnd = 'Период гарантии не может превышать 10 лет'
      }
    }

    if (formData.guarantee.start) {
      const year = new Date(formData.guarantee.start).getFullYear()
      if (year < 1900 || year > 2100) {
        newErrors.guaranteeStart = 'Год должен быть в диапазоне 1900-2100'
      }
    }

    if (formData.guarantee.end) {
      const year = new Date(formData.guarantee.end).getFullYear()
      if (year < 1900 || year > 2100) {
        newErrors.guaranteeEnd = 'Год должен быть в диапазоне 1900-2100'
      }
    }

    if (formData.serialNumber.trim()) {
      const existingProduct = products.find(p => p.serialNumber === formData.serialNumber.trim())
      if (existingProduct) {
        newErrors.serialNumber = 'Продукт с таким серийным номером уже существует'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const newProduct = {
      id: Date.now(), 
      ...formData,
      date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    dispatch(addProduct(newProduct))
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
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Добавить продукт
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название продукта *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="Введите название продукта"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип продукта *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={`select-field ${errors.type ? 'border-red-500' : ''}`}
                >
                  <option value="">Выберите тип</option>
                  {productTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Спецификация *
                </label>
                <input
                  type="text"
                  value={formData.specification}
                  onChange={(e) => handleInputChange('specification', e.target.value)}
                  className={`input-field ${errors.specification ? 'border-red-500' : ''}`}
                  placeholder="Введите спецификацию"
                />
                {errors.specification && <p className="text-red-500 text-sm mt-1">{errors.specification}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Серийный номер *
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                  className={`input-field ${errors.serialNumber ? 'border-red-500' : ''}`}
                  placeholder="Введите серийный номер"
                />
                {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber}</p>}
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата начала гарантии *
                </label>
                <input
                  type="date"
                  value={formData.guarantee.start}
                  onChange={(e) => handleInputChange('guarantee', { ...formData.guarantee, start: e.target.value })}
                  className={`input-field ${errors.guaranteeStart ? 'border-red-500' : ''}`}
                  min="1900-01-01"
                  max="2100-12-31"
                />
                {errors.guaranteeStart && <p className="text-red-500 text-sm mt-1">{errors.guaranteeStart}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата окончания гарантии *
                </label>
                <input
                  type="date"
                  value={formData.guarantee.end}
                  onChange={(e) => handleInputChange('guarantee', { ...formData.guarantee, end: e.target.value })}
                  className={`input-field ${errors.guaranteeEnd ? 'border-red-500' : ''}`}
                  min={formData.guarantee.start || "1900-01-01"}
                  max="2100-12-31"
                />
                {errors.guaranteeEnd && <p className="text-red-500 text-sm mt-1">{errors.guaranteeEnd}</p>}
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена в USD *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price[0].value}
                  onChange={(e) => handlePriceChange(0, 'value', parseFloat(e.target.value) || 0)}
                  className={`input-field ${errors.priceUsd ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.priceUsd && <p className="text-red-500 text-sm mt-1">{errors.priceUsd}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена в UAH *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price[1].value}
                  onChange={(e) => handlePriceChange(1, 'value', parseFloat(e.target.value) || 0)}
                  className={`input-field ${errors.priceUah ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.priceUah && <p className="text-red-500 text-sm mt-1">{errors.priceUah}</p>}
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Приход
                </label>
                <select
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                  className="select-field"
                >
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>{order.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Состояние
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={() => handleInputChange('isNew', true)}
                      className="mr-2"
                    />
                    Новый
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isNew"
                      checked={!formData.isNew}
                      onChange={() => handleInputChange('isNew', false)}
                      className="mr-2"
                    />
                    Б/У
                  </label>
                </div>
              </div>
            </div>

            {}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                ОТМЕНИТЬ
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                ДОБАВИТЬ ПРОДУКТ
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AddProductModal
