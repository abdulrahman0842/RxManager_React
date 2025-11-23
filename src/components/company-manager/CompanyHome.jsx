import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { AddCompany } from './AddCompany'
import { ModifyCompany } from './ModifyCompany'
export const CompanyHome = () => {
    return (
        <div className='container-fluid bg-light my-2 p-3 w-75'>
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Company Home</h2>
                <div className='d-flex gap-3 w-50'>
                    <Link to={'/company-manager/add-company'} className="btn btn-outline-secondary flex-fill" >Add Company</Link>
                    <Link to={'/company-manager/modify-company'} className="btn btn-outline-secondary flex-fill" >Modify Company</Link>
                </div>
            </div>
            <Routes>
                <Route path='add-company' element={<AddCompany />} />
                <Route path='modify-company' element={<ModifyCompany />} />
            </Routes>
        </div>
    )
}
