import React from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import { AddContent } from './AddContent';
import { ModifyContent } from './ModifyContent';
import { HeaderNavButton } from '../HeaderNavButton';
export const ContentHome = () => {
    return (
        <div className='container-fluid w-75 bg-light'>
            <div className='d-flex justify-content-between p-3 my-2 align-items-center'>
                <h3>Content Manager</h3>
                <div className='d-flex gap-3 w-50'>
                    <HeaderNavButton label={"Add Content"} path={'/content-manager/add-content'} />
                    <HeaderNavButton label={"Modify Content"} path={'/content-manager/modify-content'} />
                </div>
            </div>
            <Routes>
                <Route path='add-content' element={<AddContent />} />
                <Route path='modify-content' element={<ModifyContent />} />
            </Routes>

        </div>
    )
}
