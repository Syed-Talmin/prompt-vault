import React from 'react'

const Popup = ({children}) => {
  return (
    <div className='fixed top-0 left-0 z-99 w-full h-full bg-black/40 backdrop-blur-lg bg-opacity-50 flex items-center justify-center'>
        {children}
    </div>
  )
}

export default Popup