import React from 'react'
import { Link } from 'react-router-dom'

export const HeaderNavButton = ({label, path}) => {
  return (
    <Link to={path} className='text-decoration-none btn btn-outline-secondary flex-fill'>{label}</Link>
  )
}
