import React from 'react'
import { Link } from 'react-router-dom'
import { modules } from '../utils/modules'
export const NavBar = () => {
    

    return (

        <nav className='navbar  navbar-expand-lg navbar-dark bg-dark '>

            <div className='container-fluid'>
                <Link to={'/'} className='navbar-brand'>RxManager</Link>

                <ul className='navbar-nav'>
                    {
                        modules.map(module => <li key={module.name} className='nav-item'>
                            <Link to={module.path} className={`nav-link`}>{module.name}</Link>
                        </li>)
                    }
                </ul>

            </div>
        </nav>
    )
}
