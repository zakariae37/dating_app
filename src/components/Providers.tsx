import React, { ReactNode } from 'react'
import {
    ToastContainer,

  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Providers = ({ children } : { children: ReactNode }) => {
  return (
    <div>
        <ToastContainer
            position="bottom-right"
            
        />
        {children}
    </div>
  )
}

export default Providers