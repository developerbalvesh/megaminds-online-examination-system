import React from 'react'
import Layout from '../Layout'

const Home = () => {
  return (
    <>
    <Layout title='Home'>
        <div className="container home">
            <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Welcome to </h3>
            <h1 className='text-primary'>OES</h1>
            <h4>(Online Examination System)</h4>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default Home