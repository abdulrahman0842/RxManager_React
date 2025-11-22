import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    const modules = [
        // { name: "Medicine Manager", path: "/medicine-manager" },
        // { name: "Batch Manager", path: "/batch-manager" },
        // { name: "Content Manager", path: "/content-manager" },
        // { name: "Company Manager", path: "/company-manager" },
        { name: "Storage Manager", path: "/storage-manager" },
        { name: "Item-Type Manager", path: "/item-type-manager" },
        { name: "Agency Manager", path: "/agency-manager" },
    ];

    return (

        <nav className='navbar  navbar-expand-lg navbar-dark bg-dark  '>

            <div className='container-fluid'>
                <Link to={'/'} className='navbar-brand'>RxManager</Link>

                <ul className='navbar-nav'>
                    {
                        modules.map(module => <li key={module.name} className='nav-item'>
                            <Link to={module.path} className='nav-link'>{module.name}</Link>
                        </li>)
                    }
                </ul>
                
            </div>
        </nav>
    )
}
