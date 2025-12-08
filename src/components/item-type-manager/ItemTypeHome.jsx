import { Link, Route, Routes } from "react-router-dom"
import { AddItemType } from "./AddItemType"
import { ModifyItemType } from "./ModifyItemType"
import { HeaderNavButton } from "../HeaderNavButton"

export const ItemTypeHome = () => {
  return (
    <div className="container-fluid w-75 bg-light">
      <div className="d-flex justify-content-between align-items-center my-2 p-3">
        <h3>Item Type Manager</h3>
        <div className="d-flex gap-3 w-50  ">
          <HeaderNavButton label={"Add Type"} path={'/item-type-manager/add-item-type'} />
          <HeaderNavButton label={"Modify Type"} path={'/item-type-manager/modify-item-type'} />
        </div>
      </div>
      <Routes>
        <Route path="add-item-type" element={<AddItemType />} />
        <Route path="modify-item-type" element={<ModifyItemType />} />
      </Routes>
    </div>
  )
}
