import React from 'react'
import Layout from '../../Layout'
import AdminDashboard from './AdminDashboard'
import ManageQuestionAnswer from './components/ManageQuestionAnswer'

const ManageExam = () => {
  return (
    <>
          <Layout>
        <AdminDashboard>
          <ManageQuestionAnswer />
        </AdminDashboard>
      </Layout>
    </>
  )
}

export default ManageExam