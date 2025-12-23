import React from 'react'
import { Link, Outlet } from 'react-router-dom'
export const SalesHome = () => {
  return (
    <div className='container-fluid  bg-light d-flex row  justify-content-center'>
      <div className='d-flex justify-content-between mt-2 p-3 w-75 '>
        <h3>SalesHome</h3>
        <div className='d-flex gap-3 w-50 align-items-center'>
          <Link to={'add-sale'} className='btn btn-outline-dark flex-fill'>Add Sale</Link>
          <Link to={'modify-sale'} className='btn btn-outline-dark flex-fill'>Modify Sale</Link>
        </div>
      </div>
      <Outlet />
    </div>)
}
