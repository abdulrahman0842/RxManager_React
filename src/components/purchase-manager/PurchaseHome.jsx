import { Link, Outlet } from 'react-router-dom'

export const PurchaseHome = () => {
    return (
        <div className='container-fluid  bg-light d-flex row  justify-content-center'>
            <div className='d-flex justify-content-between my-2 p-3 w-75 '>
                <h3>PurchaseHome</h3>
                <div className='d-flex gap-3 w-50 align-items-center'>
                    <Link className='btn btn-outline-dark flex-fill' to={'/purchase-manager/add-purchase'}>Add Invoice</Link>
                    <Link className='btn btn-outline-dark flex-fill' to={'/purchase-manager/modify-purchase'}>Modify Invoice</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
