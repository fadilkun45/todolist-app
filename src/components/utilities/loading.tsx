import React from 'react'
import { PropagateLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="fixed z-[1000] inset-0 h-dvh">
        <div className="bg-black opacity-75 inset-0 absolute z-1"></div>
        <div className="absolute z-[1001] flex items-center justify-center w-full h-dvh">
        <PropagateLoader color="#009496" size={50} />
        </div>
    </div>
  )
}

export default Loading