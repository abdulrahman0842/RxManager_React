import React from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import { AddContent } from './AddContent';
import { ModifyContent } from './ModifyContent';
export const ContentHome = () => {
    return (
        <div className='container-fluid w-75 bg-light'>
            <div className='d-flex justify-content-between p-3 my-2 align-items-center'>
                <h2>Content Home</h2>
                <div className='d-flex gap-3 w-50'>
                    <Link to="/content-manager/add-content" className='btn btn-outline-secondary flex-fill '>Add Content</Link>
                    <Link to="/content-manager/modify-content" className='btn btn-outline-secondary flex-fill'>Modify Content</Link>
                </div>
            </div>
            <Routes>
                <Route path='add-content' element={<AddContent />} />
                <Route path='modify-content' element={<ModifyContent />} />
            </Routes>

        </div>
    )
}
