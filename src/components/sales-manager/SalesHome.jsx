import React from 'react'
import { Link, Outlet } from 'react-router-dom'
export const SalesHome = () => {
  return (
    <>
      <div>SalesHome</div>
      <Link to={'add-sale'} className='btn btn-warning'>Add Sale</Link>
      <Link to={'modify-sale'} className='btn btn-warning'>Modify Sale</Link>
      <Outlet />
    </>)
}
