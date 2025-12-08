import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { AddCompany } from './AddCompany'
import { ModifyCompany } from './ModifyCompany'
import { HeaderNavButton } from '../HeaderNavButton'
export const CompanyHome = () => {
    return (
        <div className='container-fluid bg-light my-2 p-3 w-75'>
            <div className='d-flex justify-content-between align-items-center'>
                <h3>Company Manager</h3>
                <div className='d-flex gap-3 w-50'>
                    <HeaderNavButton label={"Add Company"} path={'/company-manager/add-company'} />
                    <HeaderNavButton label={"Modify Company"} path={'/company-manager/modify-company'} />
                </div>
            </div>
            <Routes>
                <Route path='add-company' element={<AddCompany />} />
                <Route path='modify-company' element={<ModifyCompany />} />
            </Routes>
        </div>
    )
}
