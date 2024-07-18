
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Spinner = () => {
    const navigate= useNavigate()
    const [count,setCount]=useState(5)

    useEffect(()=>{
        const intrval= setInterval(()=>{
            setCount((prevValue) => --prevValue)

        },1000)
        count === 0&&
        navigate("/login")
        return ()=>clearInterval(intrval)
    },[count,navigate])

return (
    <>
  <div>
     <div className="d-flex justify-content-center align-item-center">
        <h1 className='text-center'>redirecting to you in {count} second </h1>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
</div>
</>
  )
}

export default Spinner
