import { Route, Routes, Link } from 'react-router-dom'
import { ModifyAgency } from './ModifyAgency';
import AddAgency from './AddAgency';
export const AgencyHome = () => {
    return (
        <div className='container-fluid w-75 bg-light '>

            <div className='d-flex gap-4 justify-content-between my-2 p-3 align-items-center' >
                <h3 className=''>Agency Home</h3>
                <div className='d-flex gap-3 w-50'>
                    <Link className='text-decoration-none btn btn-outline-secondary flex-fill' to={'/agency-manager/add-agency'}>Add Agency</Link>
                    <Link className='text-decoration-none btn btn-outline-secondary flex-fill' to={'/agency-manager/modify-agency'}>Modify Agency</Link>
                </div>
            </div>
            <Routes>
                <Route path='add-agency' element={<AddAgency />}></Route>
                <Route path='modify-agency' element={<ModifyAgency />}></Route>
            </Routes>
        </div>
    )
}
