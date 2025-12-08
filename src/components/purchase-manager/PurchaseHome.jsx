import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { AddPurchase } from './AddPurchase'
import {ModifyPurchase} from './ModifyPurchase'
export const PurchaseHome = () => {
    return (
        <div className='container-fluid w-75 bg-light '>
            <div className='d-flex justify-content-between my-2 p-3'>
                <h3>PurchaseHome</h3>
                <div className='d-flex gap-3 w-50 align-items-center'>
                    <Link className='btn btn-outline-dark flex-fill' to={'/purchase-manager/add-purchase'}>Add Invoice</Link>
                    <Link className='btn btn-outline-dark flex-fill' to={'/purchase-manager/modify-purchase'}>Modify Invoice</Link>
                </div>
            </div>

            <Routes>
                <Route path='add-purchase' element={<AddPurchase />}></Route>
                
                <Route path='modify-purchase' element={<ModifyPurchase />}></Route>
            </Routes>
        </div>
    )
}
