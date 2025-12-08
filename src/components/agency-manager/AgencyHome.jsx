import { Route, Routes, Link } from 'react-router-dom'
import { ModifyAgency } from './ModifyAgency';
import AddAgency from './AddAgency';
import { HeaderNavButton } from '../HeaderNavButton';
export const AgencyHome = () => {
    return (
        <div className='container-fluid w-75 bg-light '>

            <div className='d-flex gap-4 justify-content-between my-2 p-3 align-items-center' >
                <h3 className=''>Agency Manager</h3>
                <div className='d-flex gap-3 w-50'>
                    <HeaderNavButton label={"Add Agency"} path={'/agency-manager/add-agency'} />
                    <HeaderNavButton label={"Modify Agency"} path={'/agency-manager/modify-agency'} />
                </div>
            </div>
            <Routes>
                <Route path='add-agency' element={<AddAgency />}></Route>
                <Route path='modify-agency' element={<ModifyAgency />}></Route>
            </Routes>
        </div>
    )
}
