import { Link, Route,Routes } from "react-router-dom"
import { AddItemType } from "./AddItemType"
import { ModifyItemType } from "./ModifyItemType"


export const ItemTypeHome = () => {
  return (
    <div className="container-fluid w-75 bg-light">
      <div className="d-flex justify-content-between align-items-center my-2 p-3">
        <h3>Item Type Home</h3>
        <div className="d-flex gap-3 w-50  ">
          <Link to={'/item-type-manager/add-item-type'} className="btn btn-outline-secondary flex-fill">Add Type</Link>
          <Link to={'/item-type-manager/modify-item-type'} className="btn btn-outline-secondary flex-fill">Modify Type</Link>
        </div>
      </div>
      <Routes>
        <Route path="add-item-type" element={<AddItemType />} />
        <Route path="modify-item-type" element={<ModifyItemType />} />
      </Routes>
    </div>
  )
}
