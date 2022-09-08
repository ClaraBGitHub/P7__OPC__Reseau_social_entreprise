import React from 'react'
import './_style.scss'
import HeaderFeed from '../../Components/HeaderFeed/index'
import Interceptor from '../../Components/Interceptor/interceptor'
import Card from '../../Components/Post/index'
import DisplayPosts from '../../Components/DisplayPosts/index'

const Home = () => {
  return (
    <div>
      <Interceptor />
      <HeaderFeed />
      <main className="mainHeader">
        <Card />
        <DisplayPosts />
      </main>
    </div>
  )
}

export default Home
