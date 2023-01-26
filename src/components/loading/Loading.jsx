import React from 'react'
import loadingImg from "../../assets/loading-gif.gif";
import "./loading.scss"


const Loading = () => {
  return (
    <div className='loading-container'>
        <img src={loadingImg} alt="" className='loading-img' />
    </div>
  )
}

export default Loading