import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AddStorage } from './AddStorage'
import { ModifyStorage } from './ModifyStorage'
export const StorageHome = () => {
    return (
        <div className='container-fluid bg-light w-75 my-2 p-3'>
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Storage Home</h2>
                <div className='d-flex gap-3 w-50'>
                    <Link to="/storage-manager/add-storage" className='btn btn-outline-secondary flex-fill'>Add Storage</Link>
                    <Link to="/storage-manager/modify-storage" className='btn btn-outline-secondary flex-fill'>Modify Storage</Link>
                </div>
            </div>

            <Routes>
                <Route path='add-storage' element={<AddStorage />} />
                <Route path='modify-storage' element={<ModifyStorage />} />
            </Routes>
        </div>
    )
}
