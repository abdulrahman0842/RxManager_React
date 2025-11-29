import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { AddMedicine } from './AddMedicine'
import { ModifyMedicine } from './ModifyMedicine'
export const MedicineHome = () => {
    return (
        <div className='container-fluid bg-light justify-content-center d-flex  row'>
            <div className='d-flex justify-content-between align-items-center my-2 p-3 w-75'>
                <h2>Medicine Home</h2>
                <div className='d-flex  gap-3 w-50 '>
                    <Link to={"/medicine-manager/add-medicine"} className='btn btn-outline-dark flex-fill'>Add Medicine</Link>
                    <Link to={"/medicine-manager/modify-medicine"} className='btn btn-outline-dark flex-fill'>Modify Medicine</Link>
                </div>
            </div>

            <Routes>
                <Route path={"add-medicine"} element={<AddMedicine />} />
                <Route path={"modify-medicine"} element={<ModifyMedicine />} />
            </Routes>

        </div>
    )
}
