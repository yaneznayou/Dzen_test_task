import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setProductType, setSpecification, openModal } from '@/store/slices/appSlice'
import { useTranslations } from '@/hooks/useTranslations'
import { formatDateShort, formatPrice } from '@/utils/helpers'
import { motion } from 'framer-motion'

const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { products, orders } = useAppSelector((state) => state.app)
  const { productType, specification } = useAppSelector((state) => state.filter)
  const { t, locale } = useTranslations()

  const productTypes = useMemo(() => {
    const types = Array.from(new Set(products.map(p => p.type)))
    return types
  }, [products])

  const specifications = useMemo(() => {
    const specs = Array.from(new Set(products.map(p => p.specification)))
    return specs
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const typeMatch = !productType || product.type === productType
      const specMatch = !specification || product.specification === specification
      return typeMatch && specMatch
    })
  }, [products, productType, specification])

  const handleDeleteProduct = (productId: number) => {
    dispatch(openModal({ type: 'delete', data: { type: 'product', id: productId } }))
  }

  const handleAddProduct = () => {
    dispatch(openModal({ type: 'add-product', data: null }))
  }

  const getOrderTitle = (orderId: number) => {
    const order = orders.find(o => o.id === orderId)
    return order?.title || '-'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleAddProduct}
            className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('products.title')} / {filteredProducts.length}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('products.type')}:</label>
            <select
              value={productType}
              onChange={(e) => dispatch(setProductType(e.target.value))}
              className="select-field w-full sm:w-48"
            >
              <option value="">{t('products.allTypes')}</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('products.specification')}:</label>
            <select
              value={specification}
              onChange={(e) => dispatch(setSpecification(e.target.value))}
              className="select-field w-full sm:w-48"
            >
              <option value="">{t('products.allSpecs')}</option>
              {specifications.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.title')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.guarantee')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.condition')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.price')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.group')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.order')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.orderDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-3 h-3 rounded-full ${
                      product.isNew ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.serialNumber}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.isNew 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.isNew ? t('common.free') : t('common.inRepair')}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {t('products.from')} {formatDateShort(product.guarantee.start, locale)} {t('products.to')} {formatDateShort(product.guarantee.end, locale)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.isNew 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.isNew ? t('common.new') : t('common.used')}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.price.map((p, idx) => (
                        <div key={idx}>
                          {formatPrice(p.value, p.symbol)}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Длинное предлинное длиннючее название группы
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getOrderTitle(product.order)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDateShort(product.date, locale)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductsList
