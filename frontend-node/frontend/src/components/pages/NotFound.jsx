import React from 'react'
import Layout from '../Layout'

const NotFound = () => {
  return (
    <>
    <Layout title='Not found'>
        <div className="home">
            <div className="d-flex justify-content-center align-items-center">
            <h1 className='text-danger'>Page not found !</h1>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default NotFound