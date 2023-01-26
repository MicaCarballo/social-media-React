import React from 'react'

import Posts from '../../components/posts/Posts'
import Share from '../../components/share/Share'
import "./home.scss"


const Home = ({setmenuOpen, menuOpen}) => {
  return (
    <div className='home'>
      
      <Share/>
 <Posts />
    </div>
  )
}

export default Home