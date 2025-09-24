import React from 'react'
import Layout from '@/components/Layout'
import GroupsList from '@/components/GroupsList'
import GroupDetail from '@/components/GroupDetail'

const GroupsPage: React.FC = () => {
  return (
    <Layout>
      {}
      <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-8rem)] gap-4 lg:gap-6">
        {}
        <div className="flex-1 lg:flex-1 lg:mr-6">
          <GroupsList />
        </div>

        {}
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <GroupDetail />
        </div>
      </div>
    </Layout>
  )
}

export default GroupsPage
