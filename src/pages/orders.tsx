import React from 'react'
import Layout from '@/components/Layout'
import OrdersList from '@/components/OrdersList'
import OrderDetail from '@/components/OrderDetail'

const OrdersPage: React.FC = () => {
  return (
    <Layout>
      {}
      <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-8rem)] gap-4 lg:gap-6">
        {}
        <div className="flex-1 lg:flex-1 lg:mr-6">
          <OrdersList />
        </div>

        {}
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <OrderDetail />
        </div>
      </div>
    </Layout>
  )
}

export default OrdersPage
