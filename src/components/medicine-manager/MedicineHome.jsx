import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { AddMedicine } from './AddMedicine'
import { ModifyMedicine } from './ModifyMedicine'
import { HeaderNavButton } from '../HeaderNavButton'
export const MedicineHome = () => {
    return (
        <div className='container-fluid bg-light justify-content-center d-flex  row'>
            <div className='d-flex justify-content-between align-items-center my-2 p-3 w-75'>
                <h3>Medicine Manager</h3>
                <div className='d-flex  gap-3 w-50 '>
                    <HeaderNavButton label={"Add Medicine"} path={'/medicine-manager/add-medicine'} />
                    <HeaderNavButton label={"Modify Medicine"} path={'/medicine-manager/modify-medicine'} />
                </div>
            </div>

            <Routes>
                <Route path={"add-medicine"} element={<AddMedicine />} />
                <Route path={"modify-medicine"} element={<ModifyMedicine />} />
            </Routes>

        </div>
    )
}
