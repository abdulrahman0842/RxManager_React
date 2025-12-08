import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AddStorage } from './AddStorage'
import { ModifyStorage } from './ModifyStorage'
import { HeaderNavButton } from '../HeaderNavButton'
export const StorageHome = () => {
    return (
        <div className='container-fluid bg-light w-75 my-2 p-3'>
            <div className='d-flex justify-content-between align-items-center'>
                <h3>Storage Manager</h3>
                <div className='d-flex gap-3 w-50'>
                    <HeaderNavButton label={"Add Storage"} path={"/storage-manager/add-storage"} />
                    <HeaderNavButton label={"Modify Storage"} path={"/storage-manager/modify-storage"} />
                </div>
            </div>

            <Routes>
                <Route path='add-storage' element={<AddStorage />} />
                <Route path='modify-storage' element={<ModifyStorage />} />
            </Routes>
        </div>
    )
}
